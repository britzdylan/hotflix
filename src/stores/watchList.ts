import type { IShow } from '@/types'
import { defineStore } from 'pinia'
import { useShowsStore } from './shows'

export const useWatchListStore = defineStore('watchList', {
  state: () => {
    return {
      WatchList: [] as number[]
    }
  },
  getters: {
    getWatchList(): number[] {
      return this.WatchList
    },
    getWatchListShows(): IShow[] {
      const watchList = this.WatchList
      const watchListShows: IShow[] = []
      const shows = useShowsStore().allShows
      for (const show of shows) {
        if (watchList.includes(show.id)) {
          watchListShows.push(show)
        }
      }
      return watchListShows
    }
  },
  actions: {
    initWatchList() {
      const watchList = localStorage.getItem('WatchList')
      if (watchList) {
        this.WatchList = JSON.parse(watchList)
      }
    },
    addToWatchList(id: number) {
      if (!this.WatchList.includes(id)) {
        this.WatchList.push(id)
        this.persistWhishList()
      }
    },
    removeFromWatchList(id: number) {
      const index = this.WatchList.indexOf(id)
      if (index !== -1) {
        this.WatchList.splice(index, 1)
        this.persistWhishList()
      }
    },
    persistWhishList() {
      localStorage.setItem('WatchList', JSON.stringify(this.WatchList))
    }
  }
})
