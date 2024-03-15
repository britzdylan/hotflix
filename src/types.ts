export type TGenre = string

export interface ApiError {
  status: 'error'
  message: string
}

export type TGenres = TGenre[]

interface IShowImage {
  type: string
  image: string
}

export interface IShow {
  id: number
  name: string
  genres: TGenres
  rating: number
  image: string
}

export interface IShowDetailed extends IShow {
  summary: string
  officialSite: string
  premiered: string
  ended: string | null
  language: string
  network: string | null
  webChannel: string | null
  seasons: number
  images: IShowImage[]
}

export interface ICachedShow {
  data: IShowDetailed
  timestamp: number
}
