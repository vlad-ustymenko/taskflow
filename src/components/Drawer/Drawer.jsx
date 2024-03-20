import { useSelector } from 'react-redux'
import { selectToggleMenu } from '../../redux/slices/togglesSlice'
import Menu from '../Menu/Menu'
import styles from './Drawer.module.scss'

const Drawer = () => {
  const isActive = useSelector(selectToggleMenu)

  return (
    <div
      className={
        !isActive ? styles.drawer : `${styles.drawer} ${styles.active}`
      }
    >
      <Menu></Menu>
    </div>
  )
}

export default Drawer
