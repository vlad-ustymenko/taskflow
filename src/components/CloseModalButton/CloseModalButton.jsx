import { IoClose } from 'react-icons/io5'
import styles from './CloseModalButton.module.scss'

const closeModalButton = ({ task, closeTaskModal, closeCategoryModal }) => {
  return (
    <IoClose
      className={styles.closeIcon}
      size={30}
      onClick={task ? closeTaskModal : closeCategoryModal}
    />
  )
}

export default closeModalButton
