'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './auth.module.css'
import { useAuth } from '@/contexts/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    try {
      // In a real app, you would make an API request here
      // For demo purposes, we'll just simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Use the login function from AuthContext
      login(formData.email)
      
      setSuccess('Login successful! Redirecting...')
      
      // Redirect to homepage after successful login
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    } catch (err) {
      setError('Login failed. Please check your credentials.')
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
        <h1 className={styles.authTitle}>Login</h1>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}
        
        <form className={styles.authForm} onSubmit={handleSubmit}>
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
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.authButton}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className={styles.authLinks}>
          <p>Don&apos;t have an account? <Link href="/register" className={styles.authLink}>Register</Link></p>
          <Link href="/" className={styles.authLink}>Back to Homepage</Link>
        </div>
      </motion.div>
    </div>
  )
} 