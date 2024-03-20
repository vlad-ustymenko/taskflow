import React from 'react'
import styles from './ButtonMain.module.scss'

const ButtonMain = ({ onClick, children, style }) => {
  return (
    <button className={styles.button} onClick={onClick} style={style}>
      {children}
    </button>
  )
}

export default ButtonMain
