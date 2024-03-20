import { useSelector, useDispatch } from 'react-redux'
import { selectToggleMenu, toggleMenu } from '../../redux/slices/togglesSlice'
import styles from './MenuButton.module.scss'

const MenuButton = () => {
  const isActive = useSelector(selectToggleMenu)

  const dispatch = useDispatch()

  const handleActiveMenu = () => {
    document.body.classList.toggle('active')
    dispatch(toggleMenu(!isActive))
  }
  return (
    <div
      className={
        !isActive ? styles.menu__btn : `${styles.menu__btn} ${styles.active}`
      }
      onClick={handleActiveMenu}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default MenuButton
