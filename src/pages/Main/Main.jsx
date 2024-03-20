import { useSelector, useDispatch } from 'react-redux'
import { toggleTaskModal } from '../../redux/slices/togglesSlice'
import { selectTasksList } from '../../redux/slices/tasksSlice'
import Task from '../../components/Task/Task'
import styles from './Main.module.scss'
import Header from '../../components/Header/Header'
import Container from '../../components/Container/Container'
import Menu from '../../components/Menu/Menu'
import ButtonMain from '../../components/ButtonMain/ButtonMain'
import setNowToMS from '../../utils/setNowToMS'

const Main = ({ category }) => {
  const tasksList = useSelector(selectTasksList)
  const dispatch = useDispatch()

  const today = setNowToMS(new Date().toLocaleDateString())

  let todayTasks = []
  let noTaskImage = ''
  let noTaskText = ''
  let noTaskSubText = ''

  const openTaskModal = () => {
    document.body.classList.toggle('active')
    dispatch(toggleTaskModal(true))
  }

  switch (category) {
    case 'Today':
      todayTasks = tasksList.filter(
        (element) => element?.date === today && !element?.isComplete
      )
      noTaskImage = 'today.webp'
      noTaskText = 'What do you need to get done today?'
      noTaskSubText = 'By default, tasks added here will be due today'
      break
    case 'Upcoming':
      todayTasks = tasksList.filter(
        (element) => element?.date > today && !element?.isComplete
      )
      noTaskImage = 'upcoming.webp'
      noTaskText = 'You have no upcoming tasks'
      noTaskSubText = "It's time to make plans for the near future"
      break
    case 'Overdeu':
      todayTasks = tasksList.filter(
        (element) => element?.date < today && !element?.isComplete
      )
      noTaskImage = 'overdeu.webp'
      noTaskText = `You have no overdue tasks`
      noTaskSubText = "That's very responsible. Way to go!"

      break

    default:
      todayTasks = tasksList.filter(
        (element) =>
          element.category.title.toLowerCase() === category.toLowerCase() &&
          !element?.isComplete
      )
      noTaskImage = 'category.webp'
      noTaskText = "hmm. You don't have any tasks in that category."
      noTaskSubText = "It's time to fix that."
  }
  return (
    <>
      <Container>
        <nav className={styles.menu}>
          <Menu className={styles.menu} />
        </nav>
        <div className={styles.mainWrapper}>
          <Header title={category}></Header>
          {todayTasks.length ? (
            <main className={styles.main}>
              {todayTasks.map((task) => (
                <Task task={task} key={task.id} category={category} />
              ))}
            </main>
          ) : (
            <>
              <div
                className={styles.noTaskImg}
                style={{
                  background: `url("./img/${noTaskImage}") center / contain no-repeat`,
                }}
              ></div>
              <div className={styles.noTaskText}>{noTaskText}</div>
              <div className={styles.noTaskSubText}>{noTaskSubText}</div>
            </>
          )}
        </div>
        <div className={styles.button}>
          <ButtonMain onClick={openTaskModal}>Create Task</ButtonMain>
        </div>
      </Container>
    </>
  )
}

export default Main
