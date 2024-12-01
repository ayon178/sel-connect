'use client'

import { Toaster } from 'react-hot-toast'
import './globals.css'
// import MenuBarMobile from '@/components/shared/MenuBarMobile'
import Sidebar from '@/components/shared/Sidebar'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import AdminNav from '@/components/shared/AdminNav'

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isNotAdminRoute = !pathname.includes('/admin')
  const [showSidebar, setShowSidebar] = useState(false)

  if (isNotAdminRoute) {
    return (
      <html lang="en">
        <body>
          <div className="min-h-screen">{children}</div>
          <Toaster />
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <div className="flex">
            {/* <MenuBarMobile setter={setShowSidebar} /> */}
            <Sidebar show={showSidebar} setter={setShowSidebar} />
            <div className="flex flex-col flex-grow min-h-screen">
              <AdminNav setter={setShowSidebar} />
              {children}
            </div>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
