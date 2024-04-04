import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/app/components/Nav/Nav'
import AuthProvider from '@/app/context/AuthProvider'
import SideBar from '@/app/components/SideBar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Direct Insurance',
  description: "Malawi's leasing insurance",
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
          <Navbar />
          <main className="">
            <div className="h-full w-full">
              <div className="h-full w-full bg-white overflow-hidden flex flex-col rounded-xl  shadow-xl"  >
                {/*  body */}
                <div className="h-full flex justify-between mt-20">
                  <SideBar />
                  <div className="w-full h-full min-h-screen py-10  px-6">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
