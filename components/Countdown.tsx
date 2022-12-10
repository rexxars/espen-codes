import React, {useEffect, useState} from 'react'
import {differenceInDays, subDays, differenceInHours} from 'date-fns'
import styles from './Countdown.module.css'
import Head from 'next/head'

export function Countdown({
  date = '2022-12-10T22:50:00Z',
  startDate = '2022-11-05T16:00:00Z',
}: {
  date?: string
  startDate?: string
}) {
  const [days, setDays] = useState<number | undefined>()
  const [hours, setHours] = useState<number | undefined>()
  const [fullHoursLeft, setFullHoursLeft] = useState<number | undefined>()
  const [rows, setRows] = useState<number | undefined>()
  const [hoursPerRow, setHoursPerRow] = useState<number | undefined>()

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    function updateDate() {
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

      clearTimeout(timer)
      timer = setTimeout(updateDate, 60000)
    }

    window.addEventListener('resize', updateDate, false)
    updateDate()

    return () => {
      window.removeEventListener('resize', updateDate, false)
      clearTimeout(timer)
    }
  }, [date, startDate])

  return (
    <>
      <div className={styles.grid}>
        {new Array(rows).fill(0).map((row, index) => {
          const hoursMaxed = (index + 1) * hoursPerRow
          const hoursMinned = index * hoursPerRow
          let width = `0`
          if (fullHoursLeft >= hoursMaxed) {
            width = `100%`
          } else if (hoursMinned < fullHoursLeft) {
            const diff = hoursMaxed - fullHoursLeft
            const prctOfRow = 100 * (diff / hoursPerRow)
            width = `${prctOfRow}%`
          }
          return <div key={index} style={{width}} />
        })}
      </div>

      <div className={styles.root}>
        <Head>
          <title key="title">Time left!</title>
        </Head>

        <main className={styles.numbers}>
          {days >= 1 && (
            <>
              {days && <h1 className={styles.days}>{days}</h1>}
              <h2 className={styles.hours}>(+{hours} hours)</h2>
            </>
          )}

          {hours > 0 && (
            <>
              <h1 className={styles.days}>{hours}</h1>
              <h2>hours</h2>
            </>
          )}
        </main>
      </div>
    </>
  )
}
