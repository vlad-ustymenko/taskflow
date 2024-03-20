import { useRef } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useSelector, useDispatch } from 'react-redux'
import { selectToggleDeleteCategoryModal } from '../../redux/slices/togglesSlice'
import { selectDeletableCategory } from '../../redux/slices/deleteCategorySlice'
import { addCategoryToDelete } from '../../redux/slices/deleteCategorySlice'
import { deleteTasksWithCategory } from '../../redux/slices/tasksSlice'
import { deleteCategory } from '../../redux/slices/categoriesSlice'
import { toggleDeleteCategoryModal } from '../../redux/slices/togglesSlice'
import styles from './DeleteCategoryModal.module.scss'
import ButtonMain from '../ButtonMain/ButtonMain'

const DeleteCategoryModal = () => {
  const isActive = useSelector(selectToggleDeleteCategoryModal)
  const deletableCategory = useSelector(selectDeletableCategory)

  const dispatch = useDispatch()

  const modalRef = useRef(null)
  useClickOutside(modalRef, () => {
    if (isActive) {
      dispatch(toggleDeleteCategoryModal(false))
      document.body.classList.toggle('active')
      dispatch(addCategoryToDelete(null))
    }
  })

  const deleteThisCategory = () => {
    dispatch(deleteTasksWithCategory(deletableCategory))
    dispatch(deleteCategory(deletableCategory))
    dispatch(toggleDeleteCategoryModal(false))
    document.body.classList.toggle('active')
    dispatch(addCategoryToDelete(null))
  }

  const cancel = () => {
    dispatch(toggleDeleteCategoryModal(false))
    document.body.classList.toggle('active')
    dispatch(addCategoryToDelete(null))
  }

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
        <h2 className={styles.modal__title}>Delete category?</h2>
        <h3 className={styles.modal__text}>
          This will permanently delete the{' '}
          <span>"{deletableCategory?.title}"</span> and all its tasks. This
          cannot be undone. Are you sure?
        </h3>
        <div className={styles.modal__buttonsWrapper}>
          <ButtonMain onClick={deleteThisCategory}>Accept</ButtonMain>
          <ButtonMain onClick={cancel} style={{ backgroundColor: '#e6e6e6' }}>
            Cancel
          </ButtonMain>
        </div>
      </div>
    </div>
  )
}

export default DeleteCategoryModal
