import { useState, useRef, useEffect } from 'react'
import { selectToggleTaskModal } from '../../redux/slices/togglesSlice'
import { selectEditTask } from '../../redux/slices/editTaskSlices'
import { useClickOutside } from '../../hooks/useClickOutside'
import { addTaskToEdit } from '../../redux/slices/editTaskSlices'
import { useDispatch, useSelector } from 'react-redux'
import { editTask } from '../../redux/slices/tasksSlice'
import { addTask } from '../../redux/slices/tasksSlice'
import { toggleTaskModal } from '../../redux/slices/togglesSlice'
import { v4 as ID } from 'uuid'
import { TiDeleteOutline } from 'react-icons/ti'
import DropdownCategory from '../DropdownCategory/DropdownCategory'
import styles from './TaskModal.module.scss'
import getDateFormat from '../../utils/getDateFormat'
import CloseModalButton from '../CloseModalButton/CloseModalButton'
import ButtonMain from '../ButtonMain/ButtonMain'
import { TbCategory2, TbSubtask } from 'react-icons/tb'
import { LuCalendarRange } from 'react-icons/lu'
import { BsTextParagraph } from 'react-icons/bs'
import setDateToMS from '../../utils/setDateToMS'
import setNowToMS from '../../utils/setNowToMS'

const TaskModal = () => {
  const editableTask = useSelector(selectEditTask)
  const today = setNowToMS(new Date().toLocaleDateString())
  const todayFormat = getDateFormat(new Date().toDateString())
  const editableTaskDate = getDateFormat(new Date(editableTask?.date))

  useEffect(() => {
    const editableSubTasks = editableTask?.subTasks.map(
      (subTask) => subTask.title
    )
    setTaskTitle(editableTask !== null ? editableTask.title : '')
    setDate(editableTask !== null ? editableTaskDate : todayFormat)
    setSubTasksTitles(editableTask !== null ? editableSubTasks : [])
    setSubTasksTitles(editableTask !== null ? editableSubTasks : [])
    setDropdownSelected(editableTask !== null ? editableTask.category : '')
  }, [editableTask, editableTaskDate, todayFormat])

  const [blankTaskTitle, setBlankTaskTitle] = useState(false)
  const [blankCategory, setBlankCategory] = useState(false)
  const [overdueDate, setOverdueDate] = useState(false)
  const [correctDate, setCorrectDate] = useState(false)
  const isActive = useSelector(selectToggleTaskModal)
  const [taskTitle, setTaskTitle] = useState('')
  const [date, setDate] = useState(todayFormat)

  const dispatch = useDispatch()

  const [subTasksTitles, setSubTasksTitles] = useState([])

  const [dropdownSelected, setDropdownSelected] = useState('')

  const createSubtaskInput = () => {
    if (!subTasksTitles.length) {
      setSubTasksTitles([...subTasksTitles, ''])
    }
    if (subTasksTitles[subTasksTitles.length - 1] !== '') {
      setSubTasksTitles([...subTasksTitles, ''])
    } else {
      const requireInput = document.querySelector(
        `#input${subTasksTitles.length - 1}`
      )
      requireInput.classList.add(`${styles.require}`)
      requireInput.classList.add(`${styles.requireSubTask}`)
    }
  }

  const deleteSubTaskInput = (e) => {
    setSubTasksTitles(
      subTasksTitles.filter(
        (subTaskInput) =>
          subTasksTitles.indexOf(subTaskInput) !== Number(e.target.id)
      )
    )
  }

  const editsTask = () => {
    if (subTasksTitles[subTasksTitles.length - 1] === '') {
      const requireInput = document.querySelector(
        `#input${subTasksTitles.length - 1}`
      )
      requireInput.classList.add(`${styles.require}`)
      requireInput.classList.add(`${styles.requireSubTask}`)
    }
    if (!taskTitle) {
      setBlankTaskTitle(true)
    }
    if (typeof dropdownSelected !== 'object') {
      setBlankCategory(true)
    }
    if (date === '') {
      setCorrectDate(true)
    }
    if (setDateToMS(date) < today) {
      setOverdueDate(true)
    }
    if (
      !taskTitle ||
      typeof dropdownSelected !== 'object' ||
      subTasksTitles[subTasksTitles.length - 1] === '' ||
      date === '' ||
      setDateToMS(date) < today
    ) {
      return
    }
    dispatch(
      editTask({
        id: editableTask?.id,
        title: taskTitle,
        subTasks: subTasksTitles.map((elem) => ({
          id: editableTask?.subTasks.id || ID(),
          title: elem,
          isComplete: false,
        })),
        isComplete: false,
        date: setDateToMS(date),
        category: {
          title: dropdownSelected.title,
          color: dropdownSelected.color,
        },
      })
    )

    dispatch(toggleTaskModal(false))
    dispatch(addTaskToEdit(null))
    setTaskTitle('')
    setDate(todayFormat)
    setSubTasksTitles([])
    setDropdownSelected('')
    setBlankTaskTitle(false)
    setBlankCategory(false)
    setCorrectDate(false)
    setOverdueDate(false)
    document.body.classList.toggle('active')
  }
  const createTask = () => {
    if (subTasksTitles[subTasksTitles.length - 1] === '') {
      const requireInput = document.querySelector(
        `#input${subTasksTitles.length - 1}`
      )
      requireInput.classList.add(`${styles.require}`)
      requireInput.classList.add(`${styles.requireSubTask}`)
    }
    if (!taskTitle) {
      setBlankTaskTitle(true)
    }
    if (typeof dropdownSelected !== 'object') {
      setBlankCategory(true)
    }
    if (date === '') {
      setCorrectDate(true)
    }
    if (setDateToMS(date) < today) {
      setOverdueDate(true)
    }
    if (
      !taskTitle ||
      typeof dropdownSelected !== 'object' ||
      subTasksTitles[subTasksTitles.length - 1] === '' ||
      date === '' ||
      setDateToMS(date) < today
    ) {
      return
    }

    dispatch(
      addTask({
        id: ID(),
        title: taskTitle,
        subTasks: subTasksTitles.map((elem) => ({
          id: ID(),
          title: elem,
          isComplete: false,
        })),
        isComplete: false,
        date: setDateToMS(date),
        category: {
          title: dropdownSelected.title,
          color: dropdownSelected.color,
        },
      })
    )

    dispatch(toggleTaskModal(false))
    dispatch(addTaskToEdit(null))
    setTaskTitle('')
    setDate(todayFormat)
    setSubTasksTitles([])
    setDropdownSelected('')
    setBlankTaskTitle(false)
    setBlankCategory(false)
    setCorrectDate(false)
    setOverdueDate(false)
    document.body.classList.toggle('active')
  }

  const closeModal = () => {
    setBlankTaskTitle(false)
    setBlankCategory(false)
    setCorrectDate(false)
    dispatch(toggleTaskModal(false))
    document.body.classList.toggle('active')
    setDropdownSelected('')
    setTaskTitle('')
    setDate(todayFormat)
    setSubTasksTitles([])
    setOverdueDate(false)
    dispatch(addTaskToEdit(null))
  }

  const modalRef = useRef(null)
  useClickOutside(modalRef, () => {
    if (isActive) {
      setBlankTaskTitle(false)
      setBlankCategory(false)
      setCorrectDate(false)
      dispatch(toggleTaskModal(false))
      document.body.classList.toggle('active')
      setDropdownSelected('')
      setTaskTitle('')
      setDate(todayFormat)
      setSubTasksTitles([])
      setOverdueDate(false)
      dispatch(addTaskToEdit(null))
    }
  })

  return (
    <div
      className={
        !isActive ? styles.modal : `${styles.modal} ${styles.activeModal}`
      }
    >
      <div
        className={
          !isActive
            ? styles.modal__BG
            : `${styles.modal__BG} ${styles.activeBG}`
        }
      ></div>
      <div
        ref={modalRef}
        className={
          !isActive
            ? styles.modal__content
            : `${styles.modal__content} ${styles.activeContent}`
        }
      >
        <CloseModalButton task={true} closeTaskModal={closeModal} />
        {editableTask !== null ? (
          <h2 className={styles.modal__title}>Edit Task</h2>
        ) : (
          <h2 className={styles.modal__title}>Create Task</h2>
        )}
        <div className={styles.wrapper}>
          <BsTextParagraph className={styles.icon} size={25} />
          <label
            htmlFor="taskTitle"
            className={
              blankTaskTitle
                ? `${styles.modal__label} ${styles.require} ${styles.requireTitle}`
                : styles.modal__label
            }
          >
            <input
              placeholder="Task title"
              type="text"
              className={`${styles.modal__taskTitle} ${styles.modal__input}`}
              id="taskTitle"
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(
                  e.target.value.replace(/[^а-яА-ЯёЁa-zA-Z0-9_\s]+$/g, '')
                )
                setBlankTaskTitle(false)
              }}
              maxLength={100}
              autoComplete="off"
            />
          </label>
        </div>
        {subTasksTitles.map((subTaskTitle, index) => (
          <div key={index} className={styles.wrapper}>
            <TbSubtask className={styles.icon} size={25} />
            <div className={styles.modal__subTaskWrapper}>
              <label
                id={`input${index}`}
                htmlFor={`ip${index}`}
                className={styles.modal__subTaskLabel}
              >
                <input
                  placeholder="Subtask title"
                  className={styles.modal__input}
                  id={`ip${index}`}
                  value={subTaskTitle}
                  name="subTaskTitle"
                  autoComplete="off"
                  maxLength={100}
                  onChange={(e) => {
                    subTasksTitles[index] = e.target.value.replace(
                      /[^а-яА-ЯёЁa-zA-Z0-9_ ]+$/g,
                      ''
                    )
                    setSubTasksTitles([...subTasksTitles])
                    const requireInput = document.querySelector(
                      `#input${subTasksTitles.length - 1}`
                    )
                    requireInput.classList.remove(`${styles.require}`)
                    requireInput.classList.remove(`${styles.requireSubTask}`)
                  }}
                ></input>
              </label>
              <TiDeleteOutline
                id={index}
                className={styles.modal__deleteButton}
                onClick={(e) => deleteSubTaskInput(e)}
              />
            </div>
          </div>
        ))}
        <ButtonMain
          onClick={createSubtaskInput}
          style={{
            padding: '7px 20px',
            borderRadius: '5px',
            fontSize: '1.2rem',
            fontWeight: '500',
          }}
        >
          Create Subtask
        </ButtonMain>
        <div className={styles.wrapper}>
          <LuCalendarRange className={styles.icon} size={25} />
          <label
            className={
              correctDate
                ? `${styles.modal__label} ${styles.require} ${styles.requireDate}`
                : overdueDate
                ? `${styles.modal__label} ${styles.require} ${styles.requireOverdeuDate}`
                : styles.modal__label
            }
          >
            <input
              type="date"
              min={todayFormat}
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
                setCorrectDate(false)
                setOverdueDate(false)
              }}
              className={`${styles.modal__datePicker} ${styles.modal__input}`}
            />
          </label>
        </div>
        <div className={styles.wrapper}>
          <TbCategory2 className={styles.icon} size={25} />
          <DropdownCategory
            className={styles.modal__input}
            selected={dropdownSelected}
            setSelected={setDropdownSelected}
            blankCategory={blankCategory}
            choseCategory={setBlankCategory}
          />
        </div>
        <ButtonMain
          onClick={editableTask !== null ? editsTask : createTask}
          style={{
            padding: '7px 20px',
            borderRadius: '5px',
            fontSize: '1.2rem',
            fontWeight: '500',
          }}
        >
          Submit
        </ButtonMain>
      </div>
    </div>
  )
}

export default TaskModal
