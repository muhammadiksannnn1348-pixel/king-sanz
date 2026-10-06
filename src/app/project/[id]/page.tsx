import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import ProjectDetail, { type ProjectDetailData } from '../../../components/ProjectDetail'
import Footer from '../../../components/Footer'
import { projectSlug } from '../../../lib/projectSlug'

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

async function getProjectByIdentifier(identifier: string): Promise<ProjectRecord | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseKey) return null

  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data: projectById, error: idError } = await supabase
    .from('projects')
    .select('id, Title, Description, Features, TechStack, Github, Link, Img')
    .eq('id', identifier)
    .maybeSingle()

  if (!idError && projectById) return projectById as ProjectRecord

  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, Title, Description, Features, TechStack, Github, Link, Img')

  if (error || !projects) return null
  return ((projects as ProjectRecord[]).find(
    (project) => projectSlug(project.Title, project.id) === identifier,
  ) ?? null)
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
  const project = await getProjectByIdentifier(id)
  if (!project) return {}

  const description = project.Description || `Detail proyek ${project.Title} oleh Sanz.`
  const url = `/project/${projectSlug(project.Title, project.id)}`
  const image = project.Img ? [{ url: project.Img, alt: `${project.Title} project preview` }] : undefined

  return {
    title: project.Title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: `${project.Title} | Sanz`,
      description,
      images: image,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: `${project.Title} | Sanz`,
      description,
      images: image,
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getProjectByIdentifier(id)
  if (!project) notFound()

  return (
    <>
      <ProjectDetail initialProject={toProjectDetailData(project)} />
      <Footer />
    </>
  )
}
