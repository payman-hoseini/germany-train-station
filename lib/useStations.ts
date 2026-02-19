'use client'
import { useEffect, useState } from 'react'
import type { Station } from './types'

const API_URL = 'https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw'

export function useStations() {
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch(API_URL)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (mounted) {
          setStations(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(String(err))
          setLoading(false)
        }
      })

    return () => { mounted = false }
  }, [])

  return { stations, loading, error }
}
