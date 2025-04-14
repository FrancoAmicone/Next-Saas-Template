import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { isAuthenticated, getCurrentUser } from '@/lib/auth'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  // Check if user is authenticated
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    redirect('/login')
  }
  
  const user = await getCurrentUser()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <nav className="bg-white shadow rounded-lg p-4">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/dashboard" 
                    className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-900 font-medium"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/dashboard/settings" 
                    className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-900 font-medium"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/dashboard/billing" 
                    className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-900 font-medium"
                  >
                    Billing
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
