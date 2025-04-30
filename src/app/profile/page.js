'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import styles from './profile.module.css'

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
    
    // Redirect if not authenticated
    if (!isLoading && !isAuthenticated && isClient) {
      window.location.href = '/login'
    }
  }, [isAuthenticated, isLoading, isClient])
  
  // Show loading state
  if (isLoading || !isClient) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingSpinner}></div>
      </div>
    )
  }
  
  // Protect route for authenticated users only
  if (!isAuthenticated) {
    return null // This will prevent flashing content before redirect
  }
  
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.profileCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Your Profile</h1>
        
        <div className={styles.profileInfo}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
          
          <div className={styles.details}>
            <div className={styles.field}>
              <span className={styles.label}>Email</span>
              <span className={styles.value}>{user?.email}</span>
            </div>
            
            <div className={styles.field}>
              <span className={styles.label}>Member Since</span>
              <span className={styles.value}>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className={styles.actions}>
          <Link href="/" className={styles.secondaryButton}>
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
} 