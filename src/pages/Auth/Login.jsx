import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function Login() {
  const [searchParams] = useSearchParams()
  const role = searchParams.get('role') || 'aprendiz'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('Funcionalidad pendiente de conexion con backend')
  }

  return (
    <>
      <div className="auth-container">
        <div className="auth-card">
          {error && (
            <div className="alert alert-danger" role="alert">{error}</div>
          )}

          <div className="auth-logo">
            <span style={{ fontSize: '3rem', fontWeight: 800, color: '#203a5f' }}>
              Admin<span style={{ color: '#39A900' }}>SENA</span>
            </span>
          </div>

          <h2>Iniciar Sesion</h2>
          <p className="auth-subtitle">Ingresa a AdminSENA para continuar</p>

          <div className="auth-role">
            Rol seleccionado: <strong>{role === 'aprendiz' ? 'Aprendiz' : 'Administrador'}</strong>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electronico</label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contrasena</label>
              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Ingresa tu contrasena"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <div className="remember">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                />
                Recordarme
              </label>
            </div>

            <button type="submit" className="btn-auth">Iniciar Sesion</button>
          </form>

          <div className="auth-register">
            No tienes una cuenta?{' '}
            <Link to="/register">Crear cuenta</Link>
          </div>
        </div>
      </div>
    </>
  )
}
