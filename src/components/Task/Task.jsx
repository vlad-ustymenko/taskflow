import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { completeTask, completeSubTask } from '../../redux/slices/tasksSlice'
import { toggleTaskModal } from '../../redux/slices/togglesSlice'
import { addTaskToEdit } from '../../redux/slices/editTaskSlices'
import Checkbox from '../Checkbox/Checkbox'
import { FaEdit } from 'react-icons/fa'
import ArrowIcon from '../ArrowIcon/ArrowIcon'
import { LuCalendarRange } from 'react-icons/lu'
import { TbSubtask } from 'react-icons/tb'
import styles from './Task.module.scss'

const Task = ({ task, category }) => {
  const [accordionOpen, setAccordionOpen] = useState(false)
  const subTaskList = task.subTasks

  const completedSutasks = subTaskList.filter((subTask) => subTask.isComplete)
  const uncompletedSutasks = subTaskList.filter(
    (subTask) => !subTask.isComplete
  )

  const handleActiveTaskModal = () => {
    document.body.classList.toggle('active')
    dispatch(toggleTaskModal(true))
  }

  const dispatch = useDispatch()
  const setCompleteTask = () => {
    setTimeout(() => dispatch(completeTask(task.id)), 500)
  }
  const setCompleteSubTask = (subTaskID) => {
    dispatch(completeSubTask(subTaskID))
  }
  return (
    <div className={styles.accordion}>
      <div className={styles.wrapper}>
        <Checkbox
          setCompleteTask={setCompleteTask}
          task={true}
          checked={false}
        />
        <div
          className={styles.wrapper}
          onClick={() => setAccordionOpen(!accordionOpen)}
          style={{ paddingBottom: '0', width: '100%' }}
        >
          <p className={styles.accordion__title}>{task.title}</p>
          {subTaskList.length ? <ArrowIcon open={accordionOpen} /> : null}
        </div>
        <FaEdit
          size={20}
          cursor="pointer"
          className={styles.accordion__editIcon}
          onClick={() => {
            dispatch(addTaskToEdit(task))
            handleActiveTaskModal()
          }}
        />
      </div>

      <div
        className={
          accordionOpen
            ? `${styles.accordion__contentWrapper} ${styles.open}`
            : styles.accordion__contentWrapper
        }
      >
        <div className={styles.accordion__content}>
          {uncompletedSutasks.map((subTask) => (
            <div key={subTask.id} className={styles.wrapper}>
              <Checkbox
                setCompleteSubtask={() => setCompleteSubTask(subTask.id)}
                checked={false}
              />
              <h2 className={styles.accordion__contentText}>{subTask.title}</h2>
            </div>
          ))}
          {completedSutasks.map((subTask) => (
            <div key={subTask.id} className={styles.wrapper}>
              <Checkbox
                setCompleteSubtask={() => setCompleteSubTask(subTask.id)}
                checked={true}
              />
              <h2 className={styles.accordion__contentCompleteText}>
                {subTask.title}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.accordion__info}>
        {category === 'Today' ? null : (
          <div className={styles.accordion__infoItemWrapper}>
            <LuCalendarRange className={styles.accordion__infoItemIcon} />
            <div
              className={`${styles.accordion__date} ${styles.accordion__infoItem}`}
            >
              {new Date(task.date).toLocaleDateString()}
            </div>
          </div>
        )}
        {subTaskList.length !== 0 ? (
          <div className={styles.accordion__infoItem}>
            <TbSubtask size={17} />
            <div className={styles.accordion__subTaskCount}>
              {subTaskList.length}
            </div>
            <div className={styles.accordion__subTasksText}>subtasks</div>
          </div>
        ) : null}
        {category.toLowerCase() === task.category.title.toLowerCase() ? null : (
          <div className={styles.accordion__infoItem}>
            <div
              className={styles.accordion__categoryColor}
              style={{ backgroundColor: `${task.category.color}` }}
            ></div>
            <div className={styles.accordion__category}>
              {task.category.title}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Task
