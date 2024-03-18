import { test, expect, vi, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useWatchListStore } from '../watchList'

const LOCAL_STORAGE_KEY = 'WatchList'
const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
vi.mock('@/stores/shows', () => {
  return {
    useShowsStore: () => {
      return {
        allShows: [
          {
            id: 1,
            name: 'show_1',
            image: 'poster_1'
          },
          {
            id: 2,
            name: 'show_2',
            image: 'poster_2'
          },
          {
            id: 3,
            name: 'show_3',
            image: 'poster_3'
          }
        ]
      }
    }
  }
})

beforeEach(() => {
  // creates a fresh pinia and makes it active
  // so it's automatically picked up by any useStore() call
  // without having to pass it to it: `useStore(pinia)`
  setActivePinia(createPinia())
})

afterEach(() => {
  localStorage.clear()
  getItemSpy.mockClear()
  setItemSpy.mockClear()
})

test('addToWatchList', () => {
  const store = useWatchListStore()
  store.addToWatchList(1)
  expect(store.getWatchList).toMatchInlineSnapshot(`
    [
      1,
    ]
  `)
  expect(setItemSpy).toHaveBeenCalledWith(LOCAL_STORAGE_KEY, JSON.stringify([1]))
})

test('removeFromWatchList', () => {
  const store = useWatchListStore()
  store.addToWatchList(1)
  store.addToWatchList(2)
  store.removeFromWatchList(1)
  expect(store.getWatchList).toMatchInlineSnapshot(`
    [
      2,
    ]
  `)
  expect(setItemSpy).toHaveBeenCalledWith(LOCAL_STORAGE_KEY, JSON.stringify([2]))
})

test('initWatchList', () => {
  const store = useWatchListStore()
  getItemSpy.mockReturnValueOnce(JSON.stringify([1, 2]))
  store.initWatchList()
  expect(getItemSpy).toHaveBeenCalledWith(LOCAL_STORAGE_KEY)
  expect(store.getWatchList).toMatchInlineSnapshot(`
    [
      1,
      2,
    ]
  `)
})

test('persistWatchList', () => {
  const store = useWatchListStore()
  store.addToWatchList(1)
  store.persistWhishList()
  expect(setItemSpy).toHaveBeenCalledWith(LOCAL_STORAGE_KEY, JSON.stringify([1]))
})

test('getWatchList', () => {
  const store = useWatchListStore()
  store.addToWatchList(1)
  store.addToWatchList(2)
  expect(store.getWatchList).toMatchInlineSnapshot(`
    [
      1,
      2,
    ]
  `)
})

test('getWatchListShows', () => {
  const store = useWatchListStore()
  store.addToWatchList(1)
  store.addToWatchList(2)
  expect(store.getWatchListShows).toMatchInlineSnapshot(`
    [
      {
        "id": 1,
        "image": "poster_1",
        "name": "show_1",
      },
      {
        "id": 2,
        "image": "poster_2",
        "name": "show_2",
      },
    ]
  `)
})

test('getWatchListShows with no watch list', () => {
  const store = useWatchListStore()
  expect(store.getWatchListShows).toMatchInlineSnapshot(`[]`)
})

test('getWatchListShows with empty watch list', () => {
  const store = useWatchListStore()
  store.addToWatchList(1)
  store.removeFromWatchList(1)
  expect(store.getWatchListShows).toMatchInlineSnapshot(`[]`)
})

test('getWatchListShows with non existing shows', () => {
  const store = useWatchListStore()
  store.addToWatchList(4)
  expect(store.getWatchListShows).toMatchInlineSnapshot(`[]`)
})
