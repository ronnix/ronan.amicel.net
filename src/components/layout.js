import React from 'react'

import Sidebar from './sidebar'
import './layout.css'

// Styles for code syntax highlighting
import 'prismjs/themes/prism.css'

const Layout = ({ children }) => (
  <div className="layout">
    <div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main">
        {children}
      </div>
    </div>
  </div>
)

export default Layout
