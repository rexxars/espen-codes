export const KOKOS_QUERY = `
  *[_type == "pet" && slug.current == "kokos"][0] {
    bio
  }
`

export const POSTS_QUERY = `
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]
    | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      mainImage,
      body
    }
`

export const PROJECTS_QUERY = `
  *[_type == "project" && defined(slug.current)] | order(featured desc, priority asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    kind,
    status,
    statusNote,
    statusChangedAt,
    startedAt,
    releasedAt,
    completedAt,
    "keywords": coalesce(keywords, []),
    priority,
    featured,
    logo,
    coverImage,
    legacyImage,
    "legacyImagePalette": legacyImage.asset->metadata.palette.dominant {
      background,
      title
    },
    body,
    "links": coalesce(links, []),
    "artifacts": coalesce(artifacts, []),
    "reflections": coalesce(reflections, []),
    websiteUrl,
    githubUrl,
    authoredFor
  }
`

export const RESUME_QUERY = `*[_id == "resume"][0]`
