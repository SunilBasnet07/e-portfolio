"use client"
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import styles from './page.module.css'
import profileImage from "@/image/team5.jpeg"

// Typing animation component
const TypingAnimation = ({ text, speed = 150 }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    let timeout

    if (pause) {
      timeout = setTimeout(() => {
        setPause(false)
        setIsDeleting(true)
      }, 2000)
      return () => clearTimeout(timeout)
    }

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % text.length)
        return
      }

      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1))
      }, speed / 2)
    } else {
      const currentText = text[currentIndex]
      
      if (displayText === currentText) {
        setPause(true)
        return
      }

      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1))
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [displayText, currentIndex, isDeleting, pause, text, speed])

  return <span className={styles.typingText}>{displayText}</span>
}

// Profile image with fallback
const ProfileImage = ({ animate }) => {
  // Use a conditional check for the import to avoid build issues
  // If the image import fails, we'll use a fallback
  const imagePath = typeof profileImage !== 'undefined' && profileImage.src 
    ? profileImage.src 
    : '/team5.jpeg'; // Fallback to a file in the public directory
    
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className={styles.profileImage}
      style={{ backgroundImage: `url(${imagePath})` }}
    >
      <motion.div
        className={styles.pulse}
        animate={animate}
      />
    </motion.div>
  )
}

export default function Home() {
  // Animation for the profile image
  const profileControls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      await profileControls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 2, repeat: Infinity, repeatType: 'loop' }
      })
    }
    sequence()
  }, [profileControls])

  // Handle profile image click
  const handleProfileClick = () => {
    // You can add custom behavior here if needed
    window.open('/profile', '_self');
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroTextContainer}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={styles.heroTitle}
            >
              Hi, I&apos;m <TypingAnimation text={["Your Name", "a Developer", "a Designer", "a Creator"]} speed={100} />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={styles.heroSubtitle}
            >
              Full Stack Developer | Problem Solver | Tech Enthusiast
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.btnPrimary}
            >
              View My Work
            </motion.button>
          </div>

          <motion.div
            onClick={handleProfileClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <ProfileImage animate={profileControls} />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`${styles.section} ${styles.bgWhite}`}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.sectionTitle}>About Me</h2>
            <div className={styles.grid2Cols}>
              <div>
                <p className={styles.textGray}>
                  I&apos;m a passionate developer with a strong background in web development.
                  I love creating beautiful, functional, and user-friendly applications.
                </p>
                <div className={styles.spaceY4}>
                  <h3 className={styles.subsectionTitle}>Skills</h3>
                  <div className={styles.skillsContainer}>
                    {['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS'].map((skill) => (
                      <span key={skill} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.aboutImage}></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`${styles.section} ${styles.bgLight}`}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.sectionTitle}>My Projects</h2>
            <div className={styles.grid3Cols}>
              {[1, 2, 3].map((project) => (
                <motion.div
                  key={project}
                  whileHover={{ y: -10 }}
                  className={styles.projectCard}
                >
                  <div className={styles.projectImage}></div>
                  <div className={styles.projectContent}>
                    <h3 className={styles.projectTitle}>Project {project}</h3>
                    <p className={styles.projectDescription}>
                      A brief description of the project and its key features.
                    </p>
                    <div className={styles.tagsContainer}>
                      <span className={`${styles.projectTag} ${styles.tagBlue}`}>React</span>
                      <span className={`${styles.projectTag} ${styles.tagGreen}`}>Node.js</span>
                    </div>
                    <div className={styles.linksContainer}>
                      <a href="#" className={styles.projectLink}>Live Demo</a>
                      <a href="#" className={styles.projectLinkSecondary}>GitHub</a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className={`${styles.section} ${styles.bgWhite}`}>
        <div className={`${styles.container} ${styles.textCenter}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.sectionTitle}>Resume</h2>
            <p className={styles.resumeDescription}>
              Download my resume to learn more about my experience and qualifications.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.btnPrimary}
            >
              Download Resume
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`${styles.section} ${styles.bgLight}`}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={styles.contactContainer}
          >
            <h2 className={styles.sectionTitle}>Get In Touch</h2>
            <form className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Name</label>
                <input
                  type="text"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email</label>
                <input
                  type="email"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Message</label>
                <textarea
                  rows="4"
                  className={styles.formTextarea}
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${styles.btnPrimary} ${styles.btnFull}`}
              >
                Send Message
              </motion.button>
            </form>
            <div className={styles.socialLinks}>
              {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className={styles.socialLink}
                >
                  {social}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
