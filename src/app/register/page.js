'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from '../login/auth.module.css'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      // In a real app, you would make an API request here
      // For demo purposes, we'll just simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccess('Account created successfully! Redirecting to login...')
      
      // Redirect to login page after successful registration
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.authContainer}>
      <motion.div 
        className={styles.authCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.authTitle}>Create Account</h1>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}
        
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.formInput}
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.formInput}
              placeholder="your@email.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.formInput}
              placeholder="••••••••"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={styles.formInput}
              placeholder="••••••••"
              required
              minLength={8}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.authButton}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        
        <div className={styles.authLinks}>
          <p>Already have an account? <Link href="/login" className={styles.authLink}>Login</Link></p>
          <Link href="/" className={styles.authLink}>Back to Homepage</Link>
        </div>
      </motion.div>
    </div>
  )
} 