import React from 'react'
import Link from 'gatsby-link'

import styles from './sidebar.module.css'

const Sidebar = () => (
  <header className={styles.sidebar}>
    <Link to="/" className={styles.portrait}></Link>
    <h1 className={styles.title}>Ronan Amicel</h1>
    <p className={styles.bio}>Développeur, geek, entrepreneur.</p>
  </header>
)

export default Sidebar
