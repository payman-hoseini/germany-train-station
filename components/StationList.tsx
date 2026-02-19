'use client'
import React from 'react'
import type { Station } from '../lib/types'

type Props = {
  stations: Station[]
  onSelect: (s: Station) => void
  highlightedId?: number | null
}

export default function StationList({ stations, onSelect, highlightedId }: Props) {
  return (
    <div className="overflow-auto max-h-[60vh]">
      {stations.map((s) => (
        <div
          key={s.id}
          onClick={() => onSelect(s)}
          className={`p-3 cursor-pointer border-b hover:bg-gray-50 ${highlightedId === s.id ? 'station-item--active' : ''}`}
          role="button"
          tabIndex={0}
        >
          <div className="font-medium">{s.name}</div>
          <div className="text-sm text-gray-600">{s.city}</div>
        </div>
      ))}
    </div>
  )
}
