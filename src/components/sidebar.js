import React from 'react'
import { Link } from 'gatsby'

import styles from './sidebar.module.css'

import '../assets/fonts/fontello-771c82e0/css/fontello.css'

const Sidebar = () => (
  <header className={styles.sidebar}>
    <section className={styles.author}>
      <Link to="/" className={styles.portrait}></Link>
      <h1 className={styles.title}>Ronan Amicel</h1>
      <p className={styles.bio}>Développeur, geek, entrepreneur.</p>
    </section>
    <section className={styles.links}>
      <ul>
        <li><a href="https://twitter.com/amicel" title="Twitter"><i className="icon-twitter" alt="Twitter" /></a></li>
        <li><a href="https://www.linkedin.com/in/ronanamicel" title="LinkedIn"><i className="icon-linkedin" alt="LinkedIn" /></a></li>
        <li><a href="https://github.com/ronnix" title="GitHub"><i className="icon-github" alt="GitHub" /></a></li>
      </ul>
    </section>
    <nav className={styles.menu}>
      <ul>
        <li><Link to="/articles/" activeClassName={styles.active}>Articles</Link></li>
      </ul>
    </nav>
  </header>
)

export default Sidebar
