import { test, expect, vi } from 'vitest'

const { usePopup } = await import('@/composables/popup')

let route = {
  path: '/home',
  query: {}
}

const updateRoute = (args: any) => {
  route = {
    ...args
  }
}

vi.mock('vue-router', () => {
  return {
    useRouter: () => {
      return {
        replace: (args: any) => updateRoute(args)
      }
    },
    useRoute: () => {
      return route
    }
  }
})

test('popup', async () => {
  const { showPopup } = usePopup()

  showPopup('show_1')

  const { popup: newVal, closePopup } = usePopup()
  expect(newVal.value).toMatchInlineSnapshot(`"show_1"`)
  expect(route).toMatchInlineSnapshot(`
    {
      "path": "/home",
      "query": {
        "popup": "show_1",
      },
    }
  `)
  closePopup()

  const { popup: oldVal } = usePopup()
  expect(oldVal.value).toMatchInlineSnapshot(`undefined`)
  expect(route).toMatchInlineSnapshot(`
    {
      "path": "/home",
      "query": {
        "popup": undefined,
      },
    }
  `)
})
