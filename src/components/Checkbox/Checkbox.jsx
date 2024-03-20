import styles from './Checkbox.module.scss'
import { useState } from 'react'

const Checkbox = ({ task, setCompleteTask, setCompleteSubtask, checked }) => {
  const [isChecked, setIsChecked] = useState(checked)
  return (
    <label className={styles.checkbox__wrapper}>
      <input
        name="checkbox"
        type="checkbox"
        className={styles.checkbox}
        checked={isChecked}
        onChange={() => {
          setIsChecked((prev) => !prev)
          task ? setCompleteTask() : setCompleteSubtask()
        }}
      ></input>
    </label>
  )
}

export default Checkbox
