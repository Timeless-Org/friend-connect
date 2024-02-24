import { Inter } from 'next/font/google'
import './globals.css'
import WalletProvider from '@components/common/PrivyProvider'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@utils/config'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'ja_JP',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION
  },
  alternates: {
    canonical: SITE_URL
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-screen w-screen">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.jpg"></link>
        <meta name="theme-color" content="#d1cd0c" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

      </head>
      <body className={`${inter.className} h-screen w-screen`}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  )
}
