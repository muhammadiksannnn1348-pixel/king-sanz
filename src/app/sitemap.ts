import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { projectSlug } from '../lib/projectSlug'

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

  const seenSlugs = new Set<string>()
  const projectEntries = (data as ProjectSitemapRecord[]).flatMap(({ id, Title }) => {
    const slug = projectSlug(Title, id)
    if (seenSlugs.has(slug)) return []

    seenSlugs.add(slug)
    return [{ url: `${siteUrl}/project/${slug}` }]
  })

  return [...entries, ...projectEntries]
}