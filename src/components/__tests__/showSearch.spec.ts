import { test, vi, expect, beforeEach } from 'vitest'
import { useShowSearch } from '@/composables/showSearch'
import { flushPromises } from '@vue/test-utils'

vi.mock('@/stores/shows', () => {
  return {
    useShowsStore: () => {
      return {
        searchShows: (q: string) => {
          return [
            {
              id: 2,
              name: q,
              image: 'poster_1'
            }
          ]
        },
        getRecommendedShows: [
          {
            id: 1,
            name: 'show_1',
            image: 'poster_1'
          }
        ]
      }
    }
  }
})

vi.mock('window', () => {
  return {
    setTimeout: vi.fn().mockImplementation((fn: () => any) => {
      Promise.resolve(fn())
    })
  }
})

beforeEach(() => {
  vi.useFakeTimers()
})

test('useShowSearch', async () => {
  const { loading, query, isTyping, title, showList, startSearch } = useShowSearch()

  expect(loading.value).toBe(false)
  expect(query.value).toBe('')
  expect(isTyping.value).toBe(false)
  expect(title.value).toBe('Recommended shows')
  expect(showList.value).toMatchInlineSnapshot(`
      [
        {
          "id": 1,
          "image": "poster_1",
          "name": "show_1",
        },
      ]
    `)

  query.value = 'The Show'
  startSearch()

  expect(isTyping.value).toBe(true)
  expect(loading.value).toBe(true)

  vi.advanceTimersByTime(700)

  await flushPromises()

  expect(isTyping.value).toBe(false)
  expect(title.value).toBe('Search results for: The Show')
  expect(loading.value).toBe(false)
  expect(showList.value).toMatchInlineSnapshot(`
    [
      {
        "id": 2,
        "image": "poster_1",
        "name": "The Show",
      },
    ]
  `)
})
