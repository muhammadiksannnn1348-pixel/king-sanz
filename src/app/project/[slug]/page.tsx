// Project detail route for a single portfolio item.

import ProjectDetail from '../../../components/ProjectDetail'
import Footer from '../../../components/Footer'

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <>
      <ProjectDetail slug={slug} />
      <Footer />
    </>
  )
}