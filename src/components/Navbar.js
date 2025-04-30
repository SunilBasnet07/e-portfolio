'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
import { useAuth } from '@/contexts/AuthContext'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    setIsMounted(true)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    if (isMenuOpen) {
      const handleClickOutside = (e) => {
        if (!e.target.closest(`.${styles.userMenu}`)) {
          setIsMenuOpen(false)
        }
      }
      
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isMenuOpen])

  // Only run client-side
  if (!isMounted) {
    return (
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${styles.navbar}`}
      >
        <div className={styles.container}>
          <div className={styles.navbarContent}>
            <div className={styles.navbarLogo}>
              <Link href="/">Portfolio</Link>
            </div>
          </div>
        </div>
      </motion.nav>
    )
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ''}`}
    >
      <div className={styles.container}>
        <div className={styles.navbarContent}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={styles.navbarLogo}
          >
            <Link href="/">Portfolio</Link>
          </motion.div>
          
          <div className={styles.navbarLinks}>
            {['Home', 'About', 'Projects', 'Resume', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.05 }}
                className={styles.navbarLink}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className={styles.authButtons}>
            {isAuthenticated ? (
              <div className={styles.userMenu}>
                <button 
                  className={styles.userButton}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsMenuOpen(!isMenuOpen)
                  }}
                >
                  <span className={styles.userInitial}>
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                </button>
                
                {isMenuOpen && (
                  <div className={styles.dropdown}>
                    <div className={styles.userEmail}>{user.email}</div>
                    <hr className={styles.divider} />
                    <Link href="/profile" className={styles.menuItem}>
                      Profile
                    </Link>
                    <button className={styles.logoutButton} onClick={logout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className={styles.loginButton}>
                  Login
                </Link>
                <Link href="/register" className={styles.registerButton}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar