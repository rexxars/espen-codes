import React, {createElement, ReactNode} from 'react'
import styles from './Prose.module.css'

export function Prose({
  as = 'div',
  className,
  children,
}: {
  children: ReactNode
  as?: string
  className?: string
}) {
  return createElement(
    as,
    {className: [className, styles.prose].filter(Boolean).join(' ')},
    children,
  )
}
