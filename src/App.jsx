import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import DATA from './data'
import ProjectCarousel from './components/ProjectCarousel'
import SpotlightCard from './components/SpotlightCard'
import Loading from './components/Loading'
import ThreeBackground from './components/ThreeBackground'
import CustomCursor from './components/CustomCursor'
import MagneticButton from './components/MagneticButton'
import Modal from './components/Modal'
import { motion } from 'framer-motion'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Education' },
  { id: 'projects', label: 'Work' },
  { id: 'publications', label: 'Publications' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Awards' },
  { id: 'contact', label: 'Contact' }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const heroTextVariants = {
  hidden: { opacity: 0, x: -40, filter: 'blur(10px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: 'easeOut' } }
}

export default function App() {
  const [active, setActive] = useState('home')
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (loading) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length) setActive(visible[0].target.id)
      },
      { root: null, rootMargin: '-30% 0px -40% 0px', threshold: [0, 0.25, 0.5] }
    )

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [loading])

  if (loading) return <Loading />

  return (
    <div>
      <CustomCursor />
      <div className="noise-overlay" />
      <div className="bg-root" aria-hidden="true">
        <ThreeBackground />
      </div>
      
      <Navbar sections={SECTIONS} active={active} />
      
      <main className="main">
        {/* 1. HOME SECTION */}
        <div id="home">
          <motion.section className="hero-section" initial="hidden" animate="visible" variants={containerVariants}>
            <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
              <motion.p variants={heroTextVariants} style={{ margin: 0, fontSize: 'clamp(14px, 2vw, 20px)', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Hey, I'm
              </motion.p>
              <motion.h1 className="hero-title" variants={heroTextVariants}>
                {DATA.personal.name.split(' ')[0]}<br/>
                {DATA.personal.name.split(' ')[1]}
              </motion.h1>
              <motion.div className="hero-subtitle" variants={heroTextVariants}>
                Building systems that think, learn, and solve.
              </motion.div>
            </div>
            
            <motion.div className="scroll-indicator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
               ↓ Scroll
            </motion.div>
          </motion.section>

          <motion.section className="section" initial="hidden" whileInView="visible" viewport={{ once:true, amount: 0.4 }} variants={containerVariants}>
            <div className="container" style={{ maxWidth: '900px' }}>
              <SpotlightCard variants={itemVariants}>
                <motion.h2 variants={itemVariants} style={{ marginTop: 0 }}>{DATA.personal.journey[0]}</motion.h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {DATA.personal.journey.slice(1).map((para, i) => (
                    <motion.p variants={itemVariants} key={i} style={{ margin: 0, fontSize: '1.15rem', color: '#cbd5e1', letterSpacing: '0.2px', lineHeight: '1.8' }}>{para}</motion.p>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          </motion.section>
        </div>

        {/* 2. EDUCATION */}
        <motion.section id="about" className="section" initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.2 }} variants={containerVariants}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <motion.h2 variants={itemVariants}>Education</motion.h2>
            <motion.div className="timeline" variants={itemVariants}>
              {DATA.education.map((edu, i) => (
                <div key={i} className="timeline-item interactive" onClick={() => setSelectedItem(edu)}>
                  <div className="timeline-title">{edu.title}</div>
                  <div className="timeline-subtitle">{edu.school} | {edu.year}</div>
                  <p className="muted" style={{ fontWeight: '500' }}>{edu.details}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* 3. PROJECTS */}
        <section id="projects" className="section">
          <div className="container">
            <motion.h2 initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount: 0.5}} transition={{duration: 0.5}}>Featured Work</motion.h2>
            <ProjectCarousel projects={DATA.projects} onSelect={(p) => setSelectedItem(p)} />
          </div>
        </section>

        {/* 4. PUBLICATIONS */}
        <motion.section id="publications" className="section" initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.1 }} variants={containerVariants}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <motion.h2 variants={itemVariants}>Publications</motion.h2>
            <motion.div className="timeline" variants={itemVariants}>
              {DATA.research.map((r, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-title" style={{ fontSize: '20px' }}>{r.title}</div>
                  <div className="timeline-subtitle">{r.venue} | {r.date}</div>
                  <ul className="styled-list">
                    {r.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* 5. SKILLS */}
        <motion.section id="skills" className="section" initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.2 }} variants={containerVariants}>
          <div className="container">
            <motion.h2 variants={itemVariants}>Technical Arsenal</motion.h2>
            <SpotlightCard variants={itemVariants}>
              {Object.entries(DATA.skills).map(([category, tags], i) => (
                <div key={i} className="skill-category">
                  <h4 style={{textTransform:'capitalize'}}>{category}</h4>
                  <div className="skill-tags">
                    {tags.map((tag, j) => (
                      <span key={j} className="skill-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </SpotlightCard>
          </div>
        </motion.section>

        {/* 6. EXPERIENCE */}
        <motion.section id="experience" className="section" initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.2 }} variants={containerVariants}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <motion.h2 variants={itemVariants}>Experience</motion.h2>
            <motion.div className="timeline" variants={itemVariants}>
              {DATA.experience.map((exp, i) => (
                <div key={i} className="timeline-item interactive" onClick={() => setSelectedItem(exp)}>
                  <div className="timeline-title">{exp.role}</div>
                  <div className="timeline-subtitle">{exp.company} | {exp.duration}</div>
                  <ul className="styled-list">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j}>{bullet}</li>
                    ))}
                  </ul>
                  {exp.link && (
                    <div style={{ marginTop: '24px' }}>
                      <a href={exp.link} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '14px', textDecoration: 'none' }}>
                        {exp.btnText || 'View'}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* 7. CERTIFICATES & ACHIEVEMENTS */}
        <motion.section id="achievements" className="section" initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.1 }} variants={containerVariants}>
          <div className="container">
            <motion.h2 variants={itemVariants}>Certificates & Achievements</motion.h2>
            <div className="grid">
              <SpotlightCard variants={itemVariants} style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{marginTop:0, fontSize: '24px'}}>Certifications</h3>
                <ul className="styled-list text-sm">
                  {DATA.certifications.map((cert, i) => (
                    <li key={i}>{cert}</li>
                  ))}
                </ul>
              </SpotlightCard>

              <SpotlightCard variants={itemVariants} style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{marginTop:0, fontSize: '24px'}}>Achievements</h3>
                <ul className="styled-list text-sm" style={{marginBottom: '32px'}}>
                  {DATA.achievements.map((ach, i) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>
                <h4 style={{marginBottom:'16px', fontSize: '20px'}}>Languages</h4>
                <div className="skill-tags">
                  {DATA.languages.map((l, i) => <span key={i} className="skill-tag">{l}</span>)}
                </div>
              </SpotlightCard>
            </div>
          </div>
        </motion.section>

        {/* 8. CONTACT */}
        <motion.section id="contact" className="section" initial="hidden" whileInView="visible" viewport={{ once:true, amount: 0.5 }} variants={containerVariants}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '650px' }}>
            <motion.h2 variants={itemVariants} style={{ justifyContent: 'center', fontSize: '42px' }}>Let's Connect</motion.h2>
            <SpotlightCard variants={itemVariants}>
              <p style={{ fontSize: '18px', marginBottom: '32px', color: '#cbd5e1' }}>
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'stretch' }}>
                <MagneticButton href={`mailto:${DATA.personal.email}`} className="w-full" style={{ padding: '16px' }}>Email me at {DATA.personal.email}</MagneticButton>
                <MagneticButton href={DATA.personal.linkedin} className="btn-outline w-full" style={{ padding: '16px' }}>Connect on LinkedIn</MagneticButton>
                <MagneticButton href={DATA.personal.github} className="btn-outline w-full" style={{ padding: '16px' }}>View my GitHub</MagneticButton>
              </div>
            </SpotlightCard>
          </div>
        </motion.section>
      </main>

      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} content={selectedItem} />
    </div>
  )
}
