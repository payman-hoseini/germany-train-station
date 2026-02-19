'use client'
import React from 'react'

type Props = {
  value: string
  onChange: (v: string) => void
  cities: string[]
}

export default function CityFilter({ value, onChange, cities }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <input
        aria-label="Filter by city"
        className="border px-3 py-2 rounded w-48"
        placeholder="Filter by city (e.g. Berlin)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <select
        className="border px-3 py-2 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All cities</option>
        {cities.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <button
        className="text-sm px-3 py-2 bg-gray-100 rounded"
        onClick={() => onChange('')}
        aria-label="Clear filter"
      >
        Clear
      </button>
    </div>
  )
}
