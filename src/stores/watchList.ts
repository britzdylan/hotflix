import { defineStore } from 'pinia'

export const useWatchListStore = defineStore('WatchList', {
  state: () => {
    return {
      WatchList: [] as number[]
    }
  },
  getters: {
    getWatchList(): number[] {
      return this.WatchList
    }
  },
  actions: {
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
