import { useState, useRef, useEffect } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { createCategory } from '../../redux/slices/categoriesSlice'
import { selectCategoriesList } from '../../redux/slices/categoriesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectToggleCategoriesModal } from '../../redux/slices/togglesSlice'
import { toggleCategoriesModal } from '../../redux/slices/togglesSlice'
import ButtonMain from '../ButtonMain/ButtonMain'
import { v4 as ID } from 'uuid'
import CloseModalButton from '../CloseModalButton/CloseModalButton'
import { IoColorPaletteOutline } from 'react-icons/io5'
import { BsTextParagraph } from 'react-icons/bs'
import styles from './CategoriesModal.module.scss'

const TaskModal = () => {
  const dispatch = useDispatch()
  const [blankTitle, setBlankTitle] = useState(false)
  const [colorUsed, setColorUsed] = useState(false)
  const [requireTitle, setRequireTitle] = useState(false)
  const [requireColor, setRequireColor] = useState(false)
  const isActive = useSelector(selectToggleCategoriesModal)
  const [categoryTitle, setCategoryTitle] = useState('')
  const [color, setColor] = useState('#000000')
  const categories = useSelector(selectCategoriesList)

  useEffect(() => {
    const existingCategory = categories.find(
      (category) => category.title === categoryTitle
    )
    const existingColor = categories.find(
      (category) => category.color === color
    )
    existingCategory !== undefined
      ? setRequireTitle(true)
      : setRequireTitle(false)

    existingColor !== undefined ? setColorUsed(true) : setColorUsed(false)
    setRequireColor(false)
  }, [categoryTitle, color, categories])

  const createNewCategory = () => {
    if (!categoryTitle) {
      setBlankTitle(true)
    }
    if (color === '#000000') {
      setRequireColor(true)
    }
    if (!categoryTitle || color === '#000000' || requireTitle || requireColor) {
      return
    }

    dispatch(
      createCategory({
        id: ID(),
        title: categoryTitle,
        color: color,
      })
    )
    dispatch(toggleCategoriesModal(false))
    document.body.classList.toggle('active')
    setCategoryTitle('')
    setColor('#000000')
  }

  const closeModal = () => {
    dispatch(toggleCategoriesModal(false))
    document.body.classList.toggle('active')
    setColor('#000000')
    setCategoryTitle('')
    setBlankTitle(false)
    setRequireColor(false)
  }

  const modalRef = useRef(null)
  useClickOutside(modalRef, () => {
    if (isActive) {
      dispatch(toggleCategoriesModal(false))
      document.body.classList.toggle('active')
      setColor('#000000')
      setCategoryTitle('')
      setBlankTitle(false)
      setRequireColor(false)
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
        <CloseModalButton task={false} closeCategoryModal={closeModal} />
        <h2 className={styles.modal__title}>Create Category</h2>
        <div className={styles.wrapper}>
          <BsTextParagraph className={styles.icon} size={25} />
          <label
            className={
              requireTitle
                ? `${styles.modal__label} ${styles.require} ${styles.requireTitle}`
                : blankTitle
                ? `${styles.modal__label} ${styles.require} ${styles.blankTitle}`
                : styles.modal__label
            }
          >
            <input
              placeholder="Category title"
              type="text"
              className={styles.modal__input}
              id="categoryTitle"
              value={categoryTitle.replace(/[^а-яА-ЯёЁa-zA-Z0-9_ ]+$/g, '')}
              onChange={(e) => {
                setCategoryTitle((prev) => (prev = e.target.value))
                setBlankTitle(false)
              }}
              maxLength={100}
              autoComplete="off"
            />
          </label>
        </div>
        <div className={styles.wrapper}>
          <IoColorPaletteOutline className={styles.icon} size={25} />
          <label
            className={
              requireColor
                ? `${styles.modal__label} ${styles.require} ${styles.requireColor}`
                : colorUsed
                ? `${styles.modal__label} ${styles.require} ${styles.requireColorUsed}`
                : styles.modal__label
            }
          >
            <input
              type="color"
              value={color}
              onChange={(e) => setColor((prev) => (prev = e.target.value))}
              className={`${styles.modal__colorPicker} ${styles.modal__input}`}
            />
          </label>
        </div>
        <ButtonMain
          onClick={createNewCategory}
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
