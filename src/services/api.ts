import type { ApiError } from '../types'
import { HttpStatusCode } from '../enums'

const base_url = import.meta.env.VITE_API_URL

const url = async (params: string) => {
  return `${base_url}/${params}`
}

const fetchFromApi = async (url: string, options: RequestInit): Promise<any | ApiError> => {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      switch (response.status) {
        case HttpStatusCode.NOT_FOUND:
          throw new Error('Endpoint not found')
        default:
          throw new Error('An error occurred while fetching data')
      }
    }

    return await response.json()
  } catch (error: any) {
    console.error('Error in fetchFromApi function: ', error)
    return {
      status: 'error',
      message: error?.message ?? 'An error occurred while fetching data'
    } as ApiError
  }
}

export const getData = async (endPoint: string): Promise<any | ApiError> => {
  return await fetchFromApi(await url(endPoint), {
    method: 'GET'
  })
}
