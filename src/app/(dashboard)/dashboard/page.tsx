import { redirect } from 'next/navigation'
import { isAuthenticated, getUserProfile } from '@/lib/auth'

export default async function DashboardPage() {
  // Check if user is authenticated
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    redirect('/login')
  }
  
  // Get user profile with subscription info
  const profile = await getUserProfile()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>
        <p className="text-gray-600">
          This is your personal dashboard where you can manage your account and access your subscription.
        </p>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
        
        {profile?.subscriptions?.length > 0 ? (
          <div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <p className="font-medium">
                Active Subscription
              </p>
            </div>
            <p className="text-gray-600 mb-4">
              Your subscription is active until{' '}
              {new Date(profile.subscriptions[0].current_period_end).toLocaleDateString()}
            </p>
            <a 
              href="/api/create-portal-session"
              className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded"
            >
              Manage Subscription
            </a>
          </div>
        ) : (
          <div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
              <p className="font-medium">
                No Active Subscription
              </p>
            </div>
            <p className="text-gray-600 mb-4">
              You don't have an active subscription. Subscribe to access premium features.
            </p>
            <a 
              href="/pricing"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              View Plans
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
