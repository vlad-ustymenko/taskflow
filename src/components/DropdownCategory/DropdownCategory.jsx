import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectCategoriesList } from '../../redux/slices/categoriesSlice'
import { useClickOutside } from '../../hooks/useClickOutside'
import styles from './DropdownCategory.module.scss'
import ArrowIcon from '../ArrowIcon/ArrowIcon'

const DropdownCategory = ({
  selected,
  setSelected,
  blankCategory,
  choseCategory,
}) => {
  const dropDownRef = useRef(null)
  useClickOutside(dropDownRef, () => {
    if (open) {
      setOpen(false)
    }
  })
  const categoryList = useSelector(selectCategoriesList)
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  return (
    <div ref={dropDownRef} className={styles.dropdown}>
      <div
        className={
          blankCategory
            ? `${styles.dropdown__inputWrapper} ${styles.require}`
            : styles.dropdown__inputWrapper
        }
        onClick={() => setOpen(true)}
      >
        <label className={styles.dropdown__label}>
          <input
            name="selectInput"
            className={styles.dropdown__input}
            placeholder="Select a category"
            value={selected ? selected.title : ''}
            autoComplete="off"
            readOnly={true}
            onChange={
              selected
                ? () => setSelected('')
                : (e) => setInputValue(e.target.value.toLowerCase())
            }
          />
        </label>
        <ArrowIcon open={open} />
      </div>

      <ul
        className={
          open
            ? `${styles.dropdown__list} ${styles.open}`
            : styles.dropdown__list
        }
      >
        {categoryList.map((category) => (
          <li
            key={category.title}
            className={`${
              category.title.toLowerCase().includes(inputValue)
                ? null
                : styles.dropdown__searchLi
            } ${
              selected?.title === category.title
                ? styles.dropdown__selected
                : null
            }`}
            onClick={() => {
              if (category.title !== selected?.title) {
                setSelected(category)
                setOpen(false)
                setTimeout(() => setInputValue(''), 1000)
                choseCategory(false)
              }
            }}
          >
            {category.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DropdownCategory
