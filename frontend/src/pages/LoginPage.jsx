import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as apiLogin } from '../services/auth.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await apiLogin(username, password)
      login(data.access_token)
      navigate('/welcome', { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="gradient-mesh"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        className="card"
        style={{ width: '100%', maxWidth: '420px' }}
      >
        {/* Logo / wordmark */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <span
            className="display-lg"
            style={{ color: 'var(--color-primary)' }}
          >
            Copilot Taller
          </span>
        </div>

        <h1
          className="heading-lg"
          style={{ marginBottom: '24px', textAlign: 'center' }}
        >
          Sign in to your account
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="input"
              placeholder="admin"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="error-msg" role="alert" style={{ marginBottom: '16px' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
