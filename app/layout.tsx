import {Header} from '../components/Header'
import styles from './layout.module.css'
import '../styles/global.css'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  )
}
