import React, { useState, useEffect } from 'react'
import '../css/HomePage.css'
import Header from '/workspaces/Catcher/catcher/src/pages/Header.jsx'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('talent')
  const [placeholder, setPlaceholder] = useState('Search by role, or keywords')

  useEffect(() => {
    setPlaceholder(
      activeTab === 'talent' ? 'Search by role, or keywords' : 'Search for job opportunities'
    )
  }, [activeTab])

  const categories = [
    { icon: 'fas fa-code', title: 'Development & IT', color: '#f4e8d0' },
    { icon: 'fas fa-palette', title: 'Design & Creative', color: '#b8d4e3' },
    { icon: 'fas fa-robot', title: 'AI Services', color: '#f4e8d0' },
    { icon: 'fas fa-bullhorn', title: 'Marketing', color: '#f4e8d0' },
    { icon: 'fas fa-calculator', title: 'Finance & Accounting', color: '#f4e8d0' },
    { icon: 'fas fa-users', title: 'HR & Training', color: '#b8d4e3' },
    { icon: 'fas fa-balance-scale', title: 'Legal', color: '#b8d4e3' },
    { icon: 'fas fa-user-tie', title: 'Admin Support', color: '#f4e8d0' },
    { icon: 'fas fa-drafting-compass', title: 'Engineering & Architecture', color: '#f4e8d0' },
  ]

  return (
    <>
      <Header />

      <main style={{ paddingTop: '80px' }}>
        <section className="hero-section">
          <div className="container">
            <div className="hero-content-wrapper">
              <h1 className="hero-title">
                Connecting clients in<br />
                need to freelancers<br />
                who deliver
              </h1>

              <div className="search-tabs">
                <div className="tab-buttons">
                  <button
                    className={`tab-btn ${activeTab === 'talent' ? 'active' : ''}`}
                    onClick={() => setActiveTab('talent')}
                  >
                    Find talent
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('jobs')}
                  >
                    Browse jobs
                  </button>
                </div>

                <form className="search-form">
                  <input
                    type="text"
                    className="search-input"
                    placeholder={placeholder}
                  />
                  <button type="submit" className="search-btn">
                    <i className="fas fa-search"></i> Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="categories-section">
          <div className="container">
            <h2 className="section-title">Explore millions of pros</h2>
            <div className="category-grid">
              {categories.map((cat) => (
                <div className="category-card" key={cat.title} style={{ background: cat.color }}>
                  <div className="category-icon">
                    <i className={cat.icon}></i>
                  </div>
                  <h5 className="category-title">{cat.title}</h5>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="featured-services">
          <div className="container">
            <h2 className="section-title">精選服務</h2>
            <p className="muted-text">（這裡將來可串接資料顯示動態卡片）</p>
            <div className="text-center">
              <a href="#" className="cta-btn">查看更多服務</a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}