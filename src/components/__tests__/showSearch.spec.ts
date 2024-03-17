import { test, vi, expect, beforeEach, afterEach } from 'vitest'
import { useShowSearch } from '@/composables/showSearch'
import { withSetup } from './utils/withSetup'
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
  const [result, app] = withSetup(useShowSearch)

  expect(result.loading.value).toBe(false)
  expect(result.query.value).toBe('')
  expect(result.isTyping.value).toBe(false)
  expect(result.title.value).toBe('Recommended shows')
  expect(result.showList.value).toMatchInlineSnapshot(`
      [
        {
          "id": 1,
          "image": "poster_1",
          "name": "show_1",
        },
      ]
    `)

  result.query.value = 'The Show'
  result.startSearch()

  expect(result.isTyping.value).toBe(true)
  expect(result.loading.value).toBe(true)

  vi.advanceTimersByTime(700)

  await flushPromises()

  expect(result.isTyping.value).toBe(false)
  expect(result.title.value).toBe('Search results for: The Show')
  expect(result.loading.value).toBe(false)
  expect(result.showList.value).toMatchInlineSnapshot(`
    [
      {
        "id": 2,
        "image": "poster_1",
        "name": "The Show",
      },
    ]
  `)
  app.unmount()
})
