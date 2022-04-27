import React from 'react'
import { Link } from 'gatsby'

import { active, bio, links, menu, portrait, sidebar, title} from './sidebar.module.css'

import '../assets/fonts/fontello-771c82e0/css/fontello.css'

const Sidebar = () => (
  <header className={sidebar}>
    <section>
      <Link to="/" className={portrait}></Link>
      <h1 className={title}>Ronan Amicel</h1>
      <p className={bio}>Développeur, geek, entrepreneur.</p>
    </section>
    <section className={links}>
      <ul>
        <li><a href="https://twitter.com/amicel" title="Twitter"><i className="icon-twitter" alt="Twitter" /></a></li>
        <li><a href="https://www.linkedin.com/in/ronanamicel" title="LinkedIn"><i className="icon-linkedin" alt="LinkedIn" /></a></li>
        <li><a href="https://github.com/ronnix" title="GitHub"><i className="icon-github" alt="GitHub" /></a></li>
      </ul>
    </section>
    <nav className={menu}>
      <ul>
        <li><Link to="/articles/" activeClassName={active}>Articles</Link></li>
        <li><Link to="/recettes/" activeClassName={active}>Recettes</Link></li>
      </ul>
    </nav>
  </header>
)

export default Sidebar
