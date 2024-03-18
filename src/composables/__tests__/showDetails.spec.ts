import { ref } from 'vue'
import { expect, vi, test, it } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { useShowDetails } from '@/composables/showDetails'
import { withSetup } from '../../components/__tests__/utils/withSetup'

vi.mock('@/composables/popup')

vi.mock('vue-router', () => {
  return {
    useRouter: () => {
      return { push: vi.fn() }
    }
  }
})

vi.mock('@/stores/shows', () => {
  return {
    useShowsStore: () => {
      return {
        getShowById: (id: any) => {
          return {
            id: id,
            images: [
              { type: 'poster', image: 'poster_1' },
              { type: 'background', image: 'background_1' }
            ]
          }
        }
      }
    }
  }
})

test('showDetails with popup & no route params', async () => {
  let mock = await import('@/composables/popup')
  mock.usePopup = vi.fn().mockReturnValue({ popup: ref('show_1') })
  let mockRouter = await import('vue-router')
  mockRouter.useRoute = vi.fn().mockReturnValue({ params: {} })

  const [result, app] = withSetup(useShowDetails)
  await flushPromises()

  expect(result.isLoading.value).toBe(false)
  expect(result.showDetails.value).toMatchInlineSnapshot(`
    {
      "id": 1,
      "images": [
        {
          "image": "poster_1",
          "type": "poster",
        },
        {
          "image": "background_1",
          "type": "background",
        },
      ],
    }
  `)

  app.unmount()
})

test('showDetails with route params & no popup', async () => {
  let mock = await import('@/composables/popup')
  mock.usePopup = vi.fn().mockReturnValue({ popup: ref('') })
  let mockRouter = await import('vue-router')
  mockRouter.useRoute = vi.fn().mockReturnValue({ params: { id: '2' } })

  const [result, app] = withSetup(useShowDetails)
  await flushPromises()

  expect(result.isLoading.value).toBe(false)
  expect(result.showDetails.value).toMatchInlineSnapshot(`
    {
      "id": 2,
      "images": [
        {
          "image": "poster_1",
          "type": "poster",
        },
        {
          "image": "background_1",
          "type": "background",
        },
      ],
    }
  `)

  app.unmount()
})

test('showDetails with no popup & no route params', async () => {
  let mock = await import('@/composables/popup')
  mock.usePopup = vi.fn().mockReturnValue({ popup: ref('') })
  let mockRouter = await import('vue-router')
  mockRouter.useRoute = vi.fn().mockReturnValue({ params: {} })

  const [result, app] = withSetup(useShowDetails)
  await flushPromises()

  expect(result.isLoading.value).toBe(false)
  expect(result.showDetails.value).toMatchInlineSnapshot(`null`)

  app.unmount()
})

test('showDetails with  popup &  route params - should default to popup first', async () => {
  let mock = await import('@/composables/popup')
  mock.usePopup = vi.fn().mockReturnValue({ popup: ref('show_1') })
  let mockRouter = await import('vue-router')
  mockRouter.useRoute = vi.fn().mockReturnValue({ params: { id: 2 } })

  const [result, app] = withSetup(useShowDetails)
  await flushPromises()

  expect(result.isLoading.value).toBe(false)
  expect(result.showDetails.value).toMatchInlineSnapshot(`
    {
      "id": 1,
      "images": [
        {
          "image": "poster_1",
          "type": "poster",
        },
        {
          "image": "background_1",
          "type": "background",
        },
      ],
    }
  `)

  app.unmount()
})
