import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export type ProjectRecord = {
  id: string
  title: string
  description: string
  category: string
  status: string
  metric: string
  metric_label: string
  tags: string[]
  accent: string
  icon: string
  tools: string
  method: string
  outcome: string
  image_url: string | null
  published: boolean
  sort_order: number
}

export type ProfileRecord = {
  id: number
  name: string
  headline: string
  bio: string
  cv_url: string | null
}

export type CommentRecord = {
  id: string
  project_id: string
  name: string
  email: string
  message: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null

export const requireSupabase = (): SupabaseClient => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  }
  return supabase
}

export const getPublishedProjects = async (): Promise<ProjectRecord[]> => {
  const client = requireSupabase()
  const { data, error } = await client.from('projects').select('*').eq('published', true).order('sort_order')
  if (error) {
    throw error
  }

  return data as ProjectRecord[]
}

export const getProfile = async (): Promise<ProfileRecord | null> => {
  const client = requireSupabase()
  const { data, error } = await client.from('profile').select('*').eq('id', 1).maybeSingle()
  if (error) throw error
  return data as ProfileRecord | null
}
