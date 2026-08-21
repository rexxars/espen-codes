export interface ResumeProfile {
  _key: string
  network: string
  url: string
  username?: string
}

export interface ResumeBasics {
  name: string
  email?: string
  label?: string
  phone?: string
  summary?: string
  website?: string
  location?: {city?: string; region?: string}
  profiles?: ResumeProfile[]
}

export interface ResumeEntry {
  _key: string
  company: string
  highlights: string[]
  position: string
  startDate: string
  endDate?: string
  website?: string
  summary?: string
}

export interface VolunteerEntry {
  _key: string
  organization: string
  highlights: string[]
  position: string
  startDate: string
  endDate?: string
  website?: string
  summary?: string
}

export interface EducationEntry {
  _key: string
  institution: string
  area: string
  studyType: string
  startDate: string
  endDate?: string
  gpa?: number
  courses?: string[]
}

export interface ResumeSkill {
  _key: string
  keywords: string[]
  name: string
}

export interface ResumeLanguage {
  _key: string
  fluency: string
  language: string
}

export interface JsonResume {
  basics: ResumeBasics
  education?: EducationEntry[]
  languages?: ResumeLanguage[]
  skills?: ResumeSkill[]
  volunteer?: VolunteerEntry[]
  work?: ResumeEntry[]
}
