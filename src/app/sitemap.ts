import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const siteUrl = 'https://www.ryujin-sanz.my.id'

type ProjectSitemapRecord = {
  id: string | number
  Title: string | null
}

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [{ url: `${siteUrl}/` }]
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) return entries

  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data, error } = await supabase.from('projects').select('id, Title')

  if (error || !data) return entries

  const seenIds = new Set<string>()
  const projectEntries = (data as ProjectSitemapRecord[]).flatMap(({ id, Title }) => {
    const entryId = String(id)
    if (!entryId || seenIds.has(entryId)) return []

    seenIds.add(entryId)
    return [{ url: `${siteUrl}/project/${entryId}` }]
  })

  return [...entries, ...projectEntries]
}