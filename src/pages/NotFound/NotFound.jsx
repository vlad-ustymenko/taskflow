import styles from './NotFound.module.scss'
import Container from '../../components/Container/Container'
import Menu from '../../components/Menu/Menu'

const Today = ({ category }) => {
  return (
    <>
      <Container>
        <nav className={styles.menu}>
          <Menu className={styles.menu} />
        </nav>
        <div className={styles.mainWrapper}>
          <div className={styles.noTaskImg}></div>
          <div className={styles.noTaskText}>There is no such page</div>
        </div>
      </Container>
    </>
  )
}

export default Today
