import { getData } from '@/services/api'
import { test, expect, beforeAll, afterAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

const server = setupServer(
  http.get('https://api.tvmaze.com/shows/1', () => {
    return HttpResponse.json({ data: 'test data' })
  })
)
beforeAll(() => {
  server.listen()
})
afterAll(() => {
  server.close()
})

test('getData - success', async () => {
  const data = await getData('shows/1')

  expect(data).toEqual({ data: 'test data' })
})

test('getData - not found', async () => {
  server.use(
    http.get('https://api.tvmaze.com/shows/2', () => {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not Found'
      })
    })
  )

  const data = await getData('shows/2')
  expect(data).toEqual(new Error('Endpoint not found'))
})

test('getData - server error', async () => {
  server.use(
    http.get('https://api.tvmaze.com/shows/2', () => {
      return new HttpResponse(null, {
        status: 500,
        statusText: 'Not Found'
      })
    })
  )

  const data = await getData('shows/2')
  expect(data).toEqual(new Error('An error occurred while fetching data'))
})

test('getData - error', async () => {
  server.use(
    http.get('https://api.tvmaze.com/fake', () => {
      return HttpResponse.error()
    })
  )

  const data = await getData('fake')

  expect(data).toMatchObject({
    status: 'error'
  })
})
