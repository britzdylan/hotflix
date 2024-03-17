export function parseShowQueryStringToNumber(query: string): Number | null {
  if (!query.includes('show_')) return null
  const id = parseInt(query.split('_')[1], 10)

  return isNaN(id) ? null : Number(id)
}

export function parseRouteParamsToNumber(id: string | string[] | undefined): Number | null {
  if (!id) return null
  return Array.isArray(id) ? Number(id[0]) : Number(id)
}
