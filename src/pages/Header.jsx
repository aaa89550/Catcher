// src/components/Header.jsx
import React from 'react'
import '../css/Header.css'

export default function Header() {
  return (
    <header className="fixed-header">
      <div className="header-container">
        <img src="/png/logo2.png" alt="Catcher Logo" className="logo" />
        <nav className="nav-links">
          <a href="#">Find talent</a>
          <a href="#">Find work</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
        <button className="login-btn">Log in</button>
      </div>
    </header>
  )
}
