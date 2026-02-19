import type { Station } from './types'

export function filterStations(stations: Station[], cityFilter: string) {
  const q = cityFilter.trim().toLowerCase()
  if (!q) return stations
  return stations.filter(s => s.city.toLowerCase().includes(q))
}
