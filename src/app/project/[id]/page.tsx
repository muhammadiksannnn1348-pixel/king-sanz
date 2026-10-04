import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import ProjectDetail, { type ProjectDetailData } from '../../../components/ProjectDetail'
import Footer from '../../../components/Footer'

type ProjectRecord = {
  id: string | number
  Title: string
  Description: string | null
  Features: string[] | null
  TechStack: string[] | null
  Github: string | null
  Link: string | null
  Img: string | null
}

async function getProjectById(id: string): Promise<ProjectRecord | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseKey) return null

  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data, error } = await supabase
    .from('projects')
    .select('id, Title, Description, Features, TechStack, Github, Link, Img')
    .eq('id', id)
    .maybeSingle()

  if (error || !data) return null
  return data as ProjectRecord
}

function toProjectDetailData(project: ProjectRecord): ProjectDetailData {
  return {
    id: project.id,
    Title: project.Title,
    Description: project.Description ?? '',
    Features: project.Features ?? [],
    TechStack: project.TechStack ?? [],
    Github: project.Github ?? '',
    Link: project.Link ?? '',
    Img: project.Img ?? undefined,
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = await getProjectById(id)
  if (!project) return {}

  const description = project.Description || `Detail proyek ${project.Title} oleh Sanz.`
  const url = `/project/${project.id}`

  return {
    title: project.Title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: `${project.Title} | Sanz`,
      description,
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getProjectById(id)
  if (!project) notFound()

  return (
    <>
      <ProjectDetail initialProject={toProjectDetailData(project)} />
      <Footer />
    </>
  )
}
