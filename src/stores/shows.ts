import { defineStore } from 'pinia'
import type { ICachedShow, IShow, IShowDetailed, TGenre, TGenres } from '@/types'
import { getData } from '@/services/api'
import genres from '@/data/genres.json'
import allShows from '@/data/shows.json'

export const useShowsStore = defineStore('showStore', {
  state: () => {
    return {
      allShows,
      genres,
      mostPopularShows: [] as { genre: TGenre; shows: IShow[] }[]
    }
  },
  getters: {
    getGenres(): TGenres {
      return this.genres
    },
    getMostPopularShows(): { genre: TGenre; shows: IShow[] }[] {
      return this.mostPopularShows
    },
    getHotNewShows: (state) => {
      const oneYearAgo = new Date()
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

      return state.allShows
        .filter((show) => show.rating >= 7.5)
        .filter((show) => show.premiered && new Date(show.premiered) >= oneYearAgo)
        .sort((a, b) => b.rating - a.rating)
    },
    getRecommendedShows: (state) => {
      return state.allShows
        .filter((show) => show.rating >= 7.9)
        .sort(() => Math.random() - 0.5)
        .slice(0, 27)
    }
  },
  actions: {
    prepareMostPopularShows() {
      this.mostPopularShows = this.genres.map((genre: TGenre) => {
        return {
          genre,
          shows: this.allShows
            .filter((show) => show.genres.includes(genre))
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 9)
        }
      })
    },
    traverseShowsPerGenre(genre: TGenre) {
      const currentGenre = this.mostPopularShows.find((show) => show.genre === genre)
      if (currentGenre) {
        const length = currentGenre.shows.length
        const showsToAdd = length + 3
        const newShows = this.allShows
          .filter((show) => show.genres.includes(genre))
          .sort((a, b) => b.rating - a.rating)
          .slice(length, showsToAdd)
        this.mostPopularShows = this.mostPopularShows.map((item) => {
          if (item.genre === genre) {
            return { ...item, shows: [...item.shows, ...newShows] }
          } else {
            return item
          }
        })
      }
    },
    prepareShowData(rawData: any): IShowDetailed {
      return {
        id: rawData.id,
        name: rawData.name,
        genres: rawData.genres,
        rating: rawData.rating.average,
        image: rawData.image.medium,
        summary: rawData.summary,
        officialSite: rawData.officialSite,
        premiered: rawData.premiered,
        ended: rawData.ended,
        language: rawData.language,
        network: rawData.network?.name ?? null,
        webChannel: rawData.webChannel?.name ?? null,
        seasons: rawData.seasons,
        images: rawData.images
      } as IShowDetailed
    },
    cacheShow(show: IShowDetailed) {
      // save to local storage
      const timestamp = Date.now()
      const showData = show
      const item = { data: showData, timestamp: timestamp }
      localStorage.setItem(show.id.toString(), JSON.stringify(item))
    },
    getCachedShow(id: Number): ICachedShow | null {
      const currentTime = Date.now()
      const cachedShow = localStorage.getItem(id.toString())
      if (cachedShow) {
        const data = JSON.parse(cachedShow) as ICachedShow

        const cachedTimestamp = data.timestamp
        const twentyFourHours = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

        if (currentTime - cachedTimestamp > twentyFourHours) {
          localStorage.removeItem(id.toString())
          return null
        }
        return data
      }
      return null
    },
    async getShowById(id: Number): Promise<IShowDetailed> {
      const cachedShow = this.getCachedShow(id)
      if (cachedShow) {
        return cachedShow.data
      }
      const rawShowData = await getData(`shows/${id}`)
      const rawSeasonsData = await getData(`shows/${id}/seasons`)
      const rawImagesData = await getData(`shows/${id}/images`)
      const rawData = {
        ...rawShowData,
        seasons: rawSeasonsData.length,
        images: rawImagesData
          .map((item: any) => ({
            type: item.type,
            image: item.resolutions.original.url
          }))
          .filter((item: any) => item.type !== null)
      }
      const preparedData = this.prepareShowData(rawData)
      this.cacheShow(preparedData)
      return preparedData as IShowDetailed
    },
    async searchShows(query: string): Promise<IShow[]> {
      const rawData = await getData(`search/shows?q=${query}`)
      return rawData
        .map((item: any) => ({
          id: item.show.id,
          name: item.show.name,
          image: item.show.image?.medium ?? null,
          rating: item.show.rating?.average ?? 0
        }))
        .filter((item: IShow) => item.image !== null)
    }
  }
})
