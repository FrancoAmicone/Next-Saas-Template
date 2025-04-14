import { createServerSupabaseClient } from './supabase'

// Check if user is authenticated
export async function isAuthenticated() {
  const supabase = createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

// Get the current user
export async function getCurrentUser() {
  const supabase = createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.user) {
    return null
  }
  
  return session.user
}

// Get user profile with subscription info
export async function getUserProfile() {
  const user = await getCurrentUser()
  
  if (!user) {
    return null
  }
  
  const supabase = createServerSupabaseClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('*, subscriptions(*)')
    .eq('id', user.id)
    .single()
    
  return profile
}
