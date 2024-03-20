import { useDispatch, useSelector } from 'react-redux'
import { selectTasksList } from '../../redux/slices/tasksSlice'
import { selectCategoriesList } from '../../redux/slices/categoriesSlice'
import { toggleDeleteCategoryModal } from '../../redux/slices/togglesSlice'
import { toggleTaskModal } from '../../redux/slices/togglesSlice'
import { toggleCategoriesModal } from '../../redux/slices/togglesSlice'
import { toggleMenu } from '../../redux/slices/togglesSlice'
import { addCategoryToDelete } from '../../redux/slices/deleteCategorySlice'
import { Link } from 'react-router-dom'
import styles from './Menu.module.scss'
import Badge from '../Badge/Badge'
import setNowToMS from '../../utils/setNowToMS'
import { FaTasks } from 'react-icons/fa'
import { BiCategory } from 'react-icons/bi'
import { TiDeleteOutline } from 'react-icons/ti'
import ButtonMain from '../ButtonMain/ButtonMain'
import { useState } from 'react'
import ArrowIcon from '../ArrowIcon/ArrowIcon'

const Menu = () => {
  const [tasksOpen, setTasksOpen] = useState(true)
  const [categoriesOpen, setCategoriesOpen] = useState(true)

  const dispatch = useDispatch()

  const openDeleteCategoryModal = (category) => {
    document.body.classList.toggle('active')
    dispatch(addCategoryToDelete(category))
    dispatch(toggleDeleteCategoryModal(true))
  }

  const openTaskModal = () => {
    document.body.classList.toggle('active')
    dispatch(toggleTaskModal(true))
  }

  const openCategoriesModal = () => {
    document.body.classList.toggle('active')
    dispatch(toggleCategoriesModal(true))
  }

  const categoryList = useSelector(selectCategoriesList)

  const closeMenu = () => {
    dispatch(toggleMenu(false))
  }

  const today = setNowToMS(new Date().toLocaleDateString())

  const taskList = useSelector(selectTasksList)
  const todayCount = taskList.filter(
    (task) => task.date === today && !task.isComplete
  )
  const overdeuCount = taskList.filter(
    (task) => task.date < today && !task.isComplete
  )
  const upcomingCount = taskList.filter(
    (task) => task.date > today && !task.isComplete
  )

  return (
    <div className={styles.menu}>
      <h2 className={styles.menu__title}>Menu</h2>

      <ButtonMain
        style={{ backgroundColor: 'white', marginBottom: '20px' }}
        onClick={openTaskModal}
      >
        Create Task
      </ButtonMain>

      <nav className={styles.menu__block}>
        <div
          className={
            tasksOpen
              ? styles.menu__titleWrapper
              : `${styles.menu__titleWrapper} ${styles.close}`
          }
          onClick={() => setTasksOpen(!tasksOpen)}
        >
          <div className={styles.wrapper}>
            <FaTasks />
            <h2>TASKS</h2>
          </div>

          <ArrowIcon open={tasksOpen} />
        </div>

        <div
          className={
            tasksOpen
              ? `${styles.menu__listWrapper} ${styles.open}`
              : styles.menu__listWrapper
          }
        >
          <ul className={styles.menu__list}>
            <Link
              to="/overdue"
              className={styles.menu__link}
              onClick={closeMenu}
            >
              <li>Overdeu</li>
              <Badge count={overdeuCount.length} />
            </Link>
            <Link to="/today" className={styles.menu__link} onClick={closeMenu}>
              <li>Today</li>
              <Badge count={todayCount.length} />
            </Link>
            <Link
              to="/upcoming"
              className={styles.menu__link}
              onClick={closeMenu}
            >
              <li>Upcoming</li>
              <Badge count={upcomingCount.length} />
            </Link>
          </ul>
        </div>
      </nav>
      <ButtonMain
        style={{ backgroundColor: 'white', margin: '20px 0' }}
        onClick={openCategoriesModal}
      >
        Create Category
      </ButtonMain>
      <nav className={styles.menu__block}>
        <div
          className={styles.menu__titleWrapper}
          onClick={() => setCategoriesOpen(!categoriesOpen)}
        >
          <div className={styles.wrapper}>
            <BiCategory />
            <h2>CATEGORIES</h2>
          </div>

          <ArrowIcon open={categoriesOpen} />
        </div>
        <div
          className={
            categoriesOpen
              ? `${styles.menu__listWrapper} ${styles.open}`
              : styles.menu__listWrapper
          }
        >
          <ul className={styles.menu__list}>
            {categoryList.map((category) => (
              <div
                key={category.title}
                className={`${styles.menu__link} ${styles.menu__linkCategory}`}
              >
                <Link
                  key={category.title}
                  to={`/${category.title.toLowerCase()}`}
                  onClick={closeMenu}
                >
                  <li>{category.title}</li>
                </Link>
                <TiDeleteOutline
                  size={25}
                  cursor="pointer"
                  onClick={() => openDeleteCategoryModal(category)}
                />
              </div>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Menu
