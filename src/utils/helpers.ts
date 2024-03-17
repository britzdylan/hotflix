export function parseShowQueryStringToNumber(query: string): Number | null {
  if (!query.includes('show_')) return null
  const id = parseInt(query.split('_')[1], 10)

  return isNaN(id) ? null : Number(id)
}

export function parseRouteParamsToNumber(id: string | string[] | undefined): Number | null {
  if (id) {
    if (Array.isArray(id)) {
      if (id.length === 0) return null
      id = id[0] // take the first element if id is an array
    }
    return isNaN(Number(id)) ? null : Number(id)
  } else {
    return null
  }
}
