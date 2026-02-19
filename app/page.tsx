'use client'
import React, { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { useStations } from '../lib/useStations'
import StationList from '../components/StationList'
import CityFilter from '../components/CityFilter'
import { filterStations } from '../lib/filter'

const StationMap = dynamic(() => import('../components/StationMap.client'), { ssr: false })

export default function HomePage() {
  const { stations, loading, error } = useStations()
  const [cityFilter, setCityFilter] = useState('')
  const [highlightedId, setHighlightedId] = useState<number | null>(null)

  const uniqueCities = useMemo(() => {
    const set = new Set<string>(stations.map(s => s.city))
    return Array.from(set).sort()
  }, [stations])

  const filtered = useMemo(() => filterStations(stations, cityFilter), [stations, cityFilter])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Germany Train Stations — Leaflet Map By (Payman Hoseini)</h1>

      <div className="mb-4 flex justify-between items-center">
        <CityFilter value={cityFilter} onChange={setCityFilter} cities={uniqueCities} />
        <div className="text-sm text-gray-600">Showing {filtered.length} / {stations.length}</div>
      </div>

      {loading && <div>Loading stations…</div>}
      {error && <div className="text-red-600">Error loading stations: {error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <StationMap
              stations={filtered}
              highlightedId={highlightedId}
              onMarkerClick={(s) => setHighlightedId(s.id)}
            />
          </div>

          <aside className="md:col-span-1 bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Stations</h2>
            <StationList
              stations={filtered}
              highlightedId={highlightedId}
              onSelect={(s) => setHighlightedId(s.id)}
            />
          </aside>
        </div>
      )}
    </div>
  )
}
