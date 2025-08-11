import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Microsoft Word Tutorial | دروس مايكروسوفت وورد',
  description: 'Interactive Microsoft Word tutorial for beginners - Learn Word step by step | دروس تفاعلية لمايكروسوفت وورد للمبتدئين',
  keywords: 'Microsoft Word, tutorial, Arabic, English, interactive, lessons, دروس وورد',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
