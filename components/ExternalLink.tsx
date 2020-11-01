import React from 'react'

export function ExternalLink({
  href,
  className,
  children,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a href={href} rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}
