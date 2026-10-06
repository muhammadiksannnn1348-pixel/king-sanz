export function projectSlug(title: string | null | undefined, id?: string | number): string {
  const slug = title
    ?.normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || (id !== undefined ? `project-${id}` : 'project')
}