import styles from './Badge.module.scss'

const Badge = ({ count, bgColor }) => {
  return (
    <div className={styles.badge} style={{ backgroundColor: `${bgColor}` }}>
      {count}
    </div>
  )
}

export default Badge
