// @env browser

import {differenceInDays, differenceInHours, subDays} from 'date-fns'
import {useEffect, useState} from 'react'

import type {CountdownProps} from '../types/countdown'
import styles from './Countdown.module.css'

export function Countdown({
  date = '2023-08-14T19:00:00.000Z',
  startDate = '2023-06-20T19:00:00Z',
}: CountdownProps) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [fullHoursLeft, setFullHoursLeft] = useState(0)
  const [rows, setRows] = useState(0)
  const [hoursPerRow, setHoursPerRow] = useState(1)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined

    function updateDate(): void {
      const diffFromStart = new Date(startDate)
      const diffFrom = new Date(date)
      const diffTo = new Date()
      const dayDiff = differenceInDays(diffFrom, diffTo)
      const hourDiff = differenceInHours(subDays(diffFrom, dayDiff), diffTo)
      const fullHourDiff = differenceInHours(diffFrom, diffFromStart)
      const fullHoursLeftDiff = differenceInHours(diffFrom, diffTo)
      const numRows = Math.ceil(window.innerHeight / 16)

      setDays(dayDiff)
      setHours(hourDiff)
      setFullHoursLeft(fullHoursLeftDiff)
      setRows(numRows)
      setHoursPerRow(fullHourDiff / numRows)

      if (timer) clearTimeout(timer)
      timer = setTimeout(updateDate, 60_000)
    }

    window.addEventListener('resize', updateDate)
    updateDate()

    return () => {
      window.removeEventListener('resize', updateDate)
      if (timer) clearTimeout(timer)
    }
  }, [date, startDate])

  return (
    <>
      <div className={styles.grid}>
        {Array.from({length: rows}, (_, index) => {
          const hoursMaxed = (index + 1) * hoursPerRow
          const hoursMinned = index * hoursPerRow
          let width = '0'

          if (fullHoursLeft >= hoursMaxed) {
            width = '100%'
          } else if (hoursMinned < fullHoursLeft) {
            const difference = hoursMaxed - fullHoursLeft
            width = `${100 * (difference / hoursPerRow)}%`
          }

          return <div key={index} style={{width}} />
        })}
      </div>

      <main className={styles.root}>
        <div className={styles.numbers}>
          {days >= 1 ? (
            <>
              <h1 className={styles.days}>{days}</h1>
              <h2 className={styles.hours}>(+{hours} hours)</h2>
            </>
          ) : (
            <>
              <h1 className={styles.days}>{hours}</h1>
              <h2>hours</h2>
            </>
          )}
        </div>
      </main>
    </>
  )
}
