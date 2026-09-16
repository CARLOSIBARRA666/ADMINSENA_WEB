import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== passwordConfirmation) {
      setError('Las contrasenas no coinciden')
      return
    }
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

          <h2>Crear Cuenta</h2>
          <p className="auth-subtitle">Registrate en AdminSENA</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input
                type="text"
                id="name"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electronico</label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contrasena</label>
              <input
                type="password"
                id="password"
                placeholder="Crea una contrasena"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_confirmation">Confirmar contrasena</label>
              <input
                type="password"
                id="password_confirmation"
                placeholder="Repite tu contrasena"
                value={passwordConfirmation}
                onChange={e => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-auth">Crear Cuenta</button>
          </form>

          <div className="auth-register">
            Ya tienes una cuenta?{' '}
            <Link to="/login">Iniciar Sesion</Link>
          </div>
        </div>
      </div>
    </>
  )
}
