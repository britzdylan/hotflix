import { defineStore } from 'pinia'
import type { ICachedShow, IShow, IShowDetailed, TGenre, TGenres } from '@/types'
import { getData } from '@/service/api'
import genres from '@/data/genres.json'
import allShows from '@/data/db.json'

export const useShowsStore = defineStore('showStore', {
  state: () => {
    return {
      allShows,
      genres
    }
  },
  getters: {
    getGenres(): TGenres {
      return this.genres
    },
    getShowsByGenre: (state) => {
      return (genre: TGenre) =>
        state.allShows.filter((show) => show.genres[0] === genre).slice(0, 9)
    }
  },
  actions: {
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
    getCachedShow(id: number): ICachedShow | null {
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
    async getShowById(id: number): Promise<IShowDetailed> {
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
    }
  }
})
