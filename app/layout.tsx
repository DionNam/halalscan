import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HalalScan - AI-Powered Halal Verification',
  description: 'Instantly verify if food products are halal using AI technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
