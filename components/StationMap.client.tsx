'use client'
import React, { useRef, useEffect } from 'react'
import type { Station } from '../lib/types'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

type Props = {
  stations: Station[]
  highlightedId?: number | null
  onMarkerClick: (s: Station) => void
}

export default function StationMap({ stations, highlightedId, onMarkerClick }: Props) {
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    try {
      // @ts-ignore
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
        iconUrl: require('leaflet/dist/images/marker-icon.png').default,
        shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
      })
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return
    if (!highlightedId) return
    const st = stations.find(s => s.id === highlightedId)
    if (st) {
      mapRef.current.flyTo([st.lat, st.lng], 12, { duration: 0.8 })
    }
  }, [highlightedId, stations])

  const center: [number, number] = [51.1657, 10.4515]

  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ height: '70vh', width: '100%' }}
      ref={(m: any) => { mapRef.current = m }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stations.map((s) => (
        <CircleMarker
          key={s.id}
          center={[s.lat, s.lng]}
          radius={highlightedId === s.id ? 10 : 6}
          pathOptions={{ color: highlightedId === s.id ? '#EF4444' : '#2563EB', fillOpacity: 0.9 }}
          eventHandlers={{ click: () => onMarkerClick(s) }}
        >
          <Popup>
            <div className="text-sm">
              <div className="font-semibold">{s.name}</div>
              <div className="text-gray-600">{s.city}</div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
