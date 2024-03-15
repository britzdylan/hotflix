export type TGenre = string

export interface ApiError {
  status: 'error'
  message: string
}

export type TGenres = TGenre[]

interface IShowImage {
  medium: string
  original: string
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
}

export interface ICachedShow {
  data: IShowDetailed
  timestamp: number
}
