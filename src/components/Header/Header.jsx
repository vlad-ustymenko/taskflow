import { useParams } from 'react-router-dom'
import styles from './Header.module.scss'

const Header = ({ title }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>{title}</h1>
    </header>
  )
}

export default Header
