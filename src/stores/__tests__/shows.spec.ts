import { test, expect, vi, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useShowsStore } from '../shows'
import { get } from 'http'
const LOCAL_STORAGE_KEY = 'WatchList'
const TIME_STAMP = 1710724892061
const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem')

const rawShowData = {
  id: 1,
  name: 'api_show_1',
  ended: null,
  genres: ['genre1'],
  rating: { average: 8 },
  image: { medium: 'poster_1', large: 'poster_1' },
  summary: 'summary',
  officialSite: 'officialSite',
  premiered: '2024-01-01',
  language: 'English',
  network: { name: 'network' },
  webChannel: null
}
const rawSeasonsData = [{ id: 1 }, { id: 2 }]
const rawImagesData = [
  {
    type: 'poster',
    resolutions: {
      original: { url: 'image1' }
    }
  },
  {
    type: 'background',
    resolutions: {
      original: { url: 'image2' }
    }
  }
]

const cacheShow = {
  data: {
    id: 1,
    name: 'show_cache',
    genres: ['genre1'],
    rating: 8,
    image: 'poster_1',
    summary: 'summary',
    officialSite: 'officialSite',
    premiered: '2024-01-01',
    language: 'English',
    network: 'network',
    webChannel: null,
    seasons: 3,
    images: [
      {
        type: 'poster',
        image: 'image2'
      }
    ],
    ended: null
  },
  timestamp: TIME_STAMP
}

vi.mock('@/data/genres.json', () => {
  return { default: ['genre1', 'genre2'] }
})
vi.mock('@/data/shows.json', async () => {
  return {
    default: [
      {
        id: 1,
        genres: ['genre1'],
        name: 'all_show_1',
        image: 'poster_1',
        rating: 8,
        premiered: `${new Date().getFullYear()}-01-01` // current year
      },
      {
        id: 2,
        genres: ['genre1'],
        name: 'all_show_2',
        image: 'poster_2',
        rating: 7.5,
        premiered: '2012-01-01'
      },
      {
        id: 3,
        genres: ['genre2'],
        name: 'all_show_3',
        image: 'poster_3',
        rating: 4,
        premiered: '2009-01-01'
      }
    ]
    // your mocked methods
  }
})
vi.mock('@/services/api', () => {
  return {
    getData: async (url: string) => {
      switch (url) {
        case 'shows/1':
          return rawShowData
        case 'shows/1/seasons':
          return rawSeasonsData
        case 'shows/1/images':
          return rawImagesData
        case 'search/shows?q=show_3':
          return [
            {
              show: {
                id: 3,
                name: 'show_3',
                image: { medium: 'poster_3' },
                rating: { average: 4 }
              }
            },
            {
              show: {
                id: 4,
                name: 'show_44',
                image: null,
                rating: { average: 4 }
              }
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

test('getGenres', () => {
  const store = useShowsStore()
  expect(store.getGenres).toMatchInlineSnapshot(`
    [
      "genre1",
      "genre2",
    ]
  `)
})

test('AllShows', () => {
  const store = useShowsStore()
  expect(store.allShows).toMatchInlineSnapshot(`
    [
      {
        "genres": [
          "genre1",
        ],
        "id": 1,
        "image": "poster_1",
        "name": "all_show_1",
        "premiered": "2024-01-01",
        "rating": 8,
      },
      {
        "genres": [
          "genre1",
        ],
        "id": 2,
        "image": "poster_2",
        "name": "all_show_2",
        "premiered": "2012-01-01",
        "rating": 7.5,
      },
      {
        "genres": [
          "genre2",
        ],
        "id": 3,
        "image": "poster_3",
        "name": "all_show_3",
        "premiered": "2009-01-01",
        "rating": 4,
      },
    ]
  `)
})

test('getRecommendedShows', () => {
  const store = useShowsStore()
  expect(store.getRecommendedShows).toMatchInlineSnapshot(`
    [
      {
        "genres": [
          "genre1",
        ],
        "id": 1,
        "image": "poster_1",
        "name": "all_show_1",
        "premiered": "2024-01-01",
        "rating": 8,
      },
    ]
  `)
})

test('getHotNewShows', () => {
  const store = useShowsStore()
  expect(store.getHotNewShows).toMatchInlineSnapshot(`
    [
      {
        "genres": [
          "genre1",
        ],
        "id": 1,
        "image": "poster_1",
        "name": "all_show_1",
        "premiered": "2024-01-01",
        "rating": 8,
      },
    ]
  `)
})

test('getMostPopularShows', () => {
  const store = useShowsStore()
  store.prepareMostPopularShows()
  expect(store.getMostPopularShows).toMatchInlineSnapshot(`
    [
      {
        "genre": "genre1",
        "shows": [
          {
            "genres": [
              "genre1",
            ],
            "id": 1,
            "image": "poster_1",
            "name": "all_show_1",
            "premiered": "2024-01-01",
            "rating": 8,
          },
          {
            "genres": [
              "genre1",
            ],
            "id": 2,
            "image": "poster_2",
            "name": "all_show_2",
            "premiered": "2012-01-01",
            "rating": 7.5,
          },
        ],
      },
      {
        "genre": "genre2",
        "shows": [
          {
            "genres": [
              "genre2",
            ],
            "id": 3,
            "image": "poster_3",
            "name": "all_show_3",
            "premiered": "2009-01-01",
            "rating": 4,
          },
        ],
      },
    ]
  `)
})

test('prepareShowData', () => {
  const store = useShowsStore()
  const rawData = {
    id: 4,
    name: 'show_4',
    ended: null,
    genres: ['genre1'],
    rating: { average: 9 },
    image: { medium: 'poster_4', large: 'poster_4' },
    images: ['image1', 'image2'],
    summary: 'summary',
    officialSite: 'officialSite',
    premiered: '2024-01-01',
    language: 'English',
    network: { name: 'network' },
    webChannel: null,
    seasons: 3
  }
  expect(store.prepareShowData(rawData)).toMatchInlineSnapshot(`
    {
      "ended": null,
      "genres": [
        "genre1",
      ],
      "id": 4,
      "image": "poster_4",
      "images": [
        "image1",
        "image2",
      ],
      "language": "English",
      "name": "show_4",
      "network": "network",
      "officialSite": "officialSite",
      "premiered": "2024-01-01",
      "rating": 9,
      "seasons": 3,
      "summary": "summary",
      "webChannel": null,
    }
  `)
})

test('traverseShowsPerGenre', () => {
  const store = useShowsStore()
  store.prepareMostPopularShows()
  expect(store.getMostPopularShows).toMatchInlineSnapshot(`
    [
      {
        "genre": "genre1",
        "shows": [
          {
            "genres": [
              "genre1",
            ],
            "id": 1,
            "image": "poster_1",
            "name": "all_show_1",
            "premiered": "2024-01-01",
            "rating": 8,
          },
          {
            "genres": [
              "genre1",
            ],
            "id": 2,
            "image": "poster_2",
            "name": "all_show_2",
            "premiered": "2012-01-01",
            "rating": 7.5,
          },
        ],
      },
      {
        "genre": "genre2",
        "shows": [
          {
            "genres": [
              "genre2",
            ],
            "id": 3,
            "image": "poster_3",
            "name": "all_show_3",
            "premiered": "2009-01-01",
            "rating": 4,
          },
        ],
      },
    ]
  `)
  expect(store.getMostPopularShows[0].shows.length).toBe(2)
  for (let i = 0; i < 9; i++) {
    store.allShows.push({
      id: i + 4,
      genres: ['genre1'],
      name: `show_${i + 4}`,
      image: 'poster_2',
      rating: 10 - i - 2,
      premiered: '2012-01-01'
    })
  }
  store.traverseShowsPerGenre('genre1')
  expect(store.getMostPopularShows).toMatchInlineSnapshot(`
    [
      {
        "genre": "genre1",
        "shows": [
          {
            "genres": [
              "genre1",
            ],
            "id": 1,
            "image": "poster_1",
            "name": "all_show_1",
            "premiered": "2024-01-01",
            "rating": 8,
          },
          {
            "genres": [
              "genre1",
            ],
            "id": 2,
            "image": "poster_2",
            "name": "all_show_2",
            "premiered": "2012-01-01",
            "rating": 7.5,
          },
          {
            "genres": [
              "genre1",
            ],
            "id": 2,
            "image": "poster_2",
            "name": "all_show_2",
            "premiered": "2012-01-01",
            "rating": 7.5,
          },
          {
            "genres": [
              "genre1",
            ],
            "id": 5,
            "image": "poster_2",
            "name": "show_5",
            "premiered": "2012-01-01",
            "rating": 7,
          },
          {
            "genres": [
              "genre1",
            ],
            "id": 6,
            "image": "poster_2",
            "name": "show_6",
            "premiered": "2012-01-01",
            "rating": 6,
          },
        ],
      },
      {
        "genre": "genre2",
        "shows": [
          {
            "genres": [
              "genre2",
            ],
            "id": 3,
            "image": "poster_3",
            "name": "all_show_3",
            "premiered": "2009-01-01",
            "rating": 4,
          },
        ],
      },
    ]
  `)
  expect(store.getMostPopularShows[0].shows.length).toBe(5)
  expect(store.getMostPopularShows[1].shows.length).toBe(1)
  // each item needs to be rated higher than the previous one
  expect(store.getMostPopularShows[0].shows[0].rating).toBe(8)
  expect(store.getMostPopularShows[0].shows[1].rating).toBe(7.5)
})

test('getCachedShow', () => {
  vi.setSystemTime(TIME_STAMP) // 2024-01-01

  const store = useShowsStore()

  getItemSpy.mockReturnValue(JSON.stringify({ data: cacheShow, timestamp: TIME_STAMP }))
  expect(removeItemSpy).not.toHaveBeenCalled()
  expect(store.getCachedShow(1)).toMatchInlineSnapshot(`
    {
      "data": {
        "data": {
          "ended": null,
          "genres": [
            "genre1",
          ],
          "id": 1,
          "image": "poster_1",
          "images": [
            {
              "image": "image2",
              "type": "poster",
            },
          ],
          "language": "English",
          "name": "show_cache",
          "network": "network",
          "officialSite": "officialSite",
          "premiered": "2024-01-01",
          "rating": 8,
          "seasons": 3,
          "summary": "summary",
          "webChannel": null,
        },
        "timestamp": 1710724892061,
      },
      "timestamp": 1710724892061,
    }
  `)
})

test('getCachedShow with expired cache', () => {
  vi.setSystemTime(TIME_STAMP) // 2024-01-01

  const store = useShowsStore()

  getItemSpy.mockReturnValue(
    JSON.stringify({ data: cacheShow, timestamp: TIME_STAMP - 24 * 60 * 60 * 1000 - 1 })
  )
  expect(store.getCachedShow(1)).toBe(null)
  expect(removeItemSpy).toHaveBeenCalled()
})

test('getShowById without cache', async () => {
  const store = useShowsStore()

  const show = await store.getShowById(1)
  expect(getItemSpy).toHaveBeenCalledTimes(1)
  expect(setItemSpy).toHaveBeenCalledTimes(1)
  expect(show).toMatchInlineSnapshot(`
    {
      "ended": null,
      "genres": [
        "genre1",
      ],
      "id": 1,
      "image": "poster_1",
      "images": [
        {
          "image": "image1",
          "type": "poster",
        },
        {
          "image": "image2",
          "type": "background",
        },
      ],
      "language": "English",
      "name": "api_show_1",
      "network": "network",
      "officialSite": "officialSite",
      "premiered": "2024-01-01",
      "rating": 8,
      "seasons": 2,
      "summary": "summary",
      "webChannel": null,
    }
  `)
})

test('getShowById with cache', async () => {
  const store = useShowsStore()

  getItemSpy.mockReturnValue(JSON.stringify(cacheShow))

  const cachedShow = await store.getShowById(1)

  expect(getItemSpy).toHaveBeenCalledTimes(1)
  expect(setItemSpy).not.toHaveBeenCalled()

  expect(cachedShow).toMatchInlineSnapshot(`
    {
      "ended": null,
      "genres": [
        "genre1",
      ],
      "id": 1,
      "image": "poster_1",
      "images": [
        {
          "image": "image2",
          "type": "poster",
        },
      ],
      "language": "English",
      "name": "show_cache",
      "network": "network",
      "officialSite": "officialSite",
      "premiered": "2024-01-01",
      "rating": 8,
      "seasons": 3,
      "summary": "summary",
      "webChannel": null,
    }
  `)
})

test('getShowById with expired cache', async () => {
  const store = useShowsStore()

  const currentTime = Date.now()
  const twentyFourHours = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
  const expiredTimestamp = currentTime - twentyFourHours - 1
  getItemSpy.mockReturnValue(
    JSON.stringify({
      ...cacheShow,
      ...{ timestamp: expiredTimestamp }
    })
  )

  const show = await store.getShowById(1)
  expect(getItemSpy).toHaveBeenCalledTimes(1)
  expect(setItemSpy).toHaveBeenCalledTimes(1)
  expect(show).toMatchInlineSnapshot(`
    {
      "ended": null,
      "genres": [
        "genre1",
      ],
      "id": 1,
      "image": "poster_1",
      "images": [
        {
          "image": "image1",
          "type": "poster",
        },
        {
          "image": "image2",
          "type": "background",
        },
      ],
      "language": "English",
      "name": "api_show_1",
      "network": "network",
      "officialSite": "officialSite",
      "premiered": "2024-01-01",
      "rating": 8,
      "seasons": 2,
      "summary": "summary",
      "webChannel": null,
    }
  `)
})

test('searchShows', async () => {
  const store = useShowsStore()
  const show = await store.searchShows('show_3')
  expect(show).toMatchInlineSnapshot(`
    [
      {
        "id": 3,
        "image": "poster_3",
        "name": "show_3",
        "rating": 4,
      },
    ]
  `)
})
