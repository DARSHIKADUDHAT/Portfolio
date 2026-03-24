import React from 'react'

export default function Navbar({ sections, active }) {
  return (
    <div className="nav-wrapper">
      <div className="nav-brand-container" style={{ position: 'absolute', left: '40px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'auto' }}>
        <a href="#home" style={{ color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: '15px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Darshika <span style={{ color: 'var(--accent)' }}>Dudhat</span>
        </a>
      </div>
      <nav className="nav">
        <ul className="nav-links">
          {sections.map(s => (
            <li key={s.id} className={active === s.id ? 'active' : ''}>
              <a href={`#${s.id}`}>{s.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
