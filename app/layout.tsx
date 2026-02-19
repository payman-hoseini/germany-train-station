import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Germany Train Stations — Leaflet',
  description: 'Map of train stations in Germany using Leaflet + Next.js app router'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
