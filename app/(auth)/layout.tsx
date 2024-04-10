import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import AuthProvider from '../context/AuthProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Direct Insurance | Sign In',
  description: "Malawi's leading insurance",
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main className="">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
