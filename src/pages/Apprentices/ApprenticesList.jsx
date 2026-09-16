import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const APPRENTICES_STORAGE_KEY = 'adminsena_apprentices'

export default function ApprenticesList() {
  // Estados iniciales vacíos (sin datos quemados)
  const [courses, _setCourses] = useState([])
  const [computers, _setComputers] = useState([])
  const [apprentices, setApprentices] = useState(() => {
    const savedApprentices = localStorage.getItem(APPRENTICES_STORAGE_KEY)

    if (!savedApprentices) return []

    try {
      const parsedApprentices = JSON.parse(savedApprentices)
      return Array.isArray(parsedApprentices) ? parsedApprentices : []
    } catch {
      return []
    }
  })

  const [search, setSearch] = useState('')
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState([])

  const [form, setForm] = useState({
    name: '',
    email: '',
    number: '',
    course_id: '',
    computer_id: '',
  })

  useEffect(() => {
    localStorage.setItem(APPRENTICES_STORAGE_KEY, JSON.stringify(apprentices))
  }, [apprentices])

  // Filtro de búsqueda
  const filtered = apprentices.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.number.includes(search)
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = []

    if (!form.name.trim()) newErrors.push('El campo Nombre es obligatorio')
    if (!form.email.trim()) newErrors.push('El campo Correo es obligatorio')
    if (!form.number.trim()) newErrors.push('El campo Número es obligatorio')

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors([])
    
    // Al registrar, crea el aprendiz localmente en el estado
    const newApprentice = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      number: form.number.trim(),
      course: courses.find(c => c.id === Number(form.course_id)) || null,
      computer: computers.find(c => c.id === Number(form.computer_id)) || null,
    }

    setApprentices(prevApprentices => [newApprentice, ...prevApprentices])
    setSuccess('Aprendiz registrado correctamente')
    setForm({ name: '', email: '', number: '', course_id: '', computer_id: '' })

    setTimeout(() => setSuccess(''), 4000)
  }

  const handleDelete = (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este aprendiz?')) return
    setApprentices(prevApprentices => prevApprentices.filter(a => a.id !== id))
    setSuccess('Aprendiz eliminado correctamente')
    setTimeout(() => setSuccess(''), 4000)
  }

  return (
    <div className="admin-module">
      <div className="module-header">
        <div className="d-flex align-items-center gap-3">
          <div className="module-icon"><i className="bi bi-people"></i></div>
          <div>
            <div className="module-eyebrow">Operación Académica</div>
            <h1 className="module-title">Aprendices</h1>
            <p className="module-subtitle">Administra los aprendices, sus cursos y equipos asignados.</p>
          </div>
        </div>
        <a href="#module-form" className="btn-modern"><i className="bi bi-plus-lg"></i> Nuevo Aprendiz</a>
      </div>

      {success && (
        <div className="alert alert-success alert-dismissible fade show mt-4" role="alert">
          <i className="bi bi-check-circle-fill me-2"></i>{success}
        </div>
      )}

      {errors.length > 0 && (
        <div className="alert alert-danger mt-4">
          <strong><i className="bi bi-exclamation-triangle-fill me-2"></i>Por favor corrige los siguientes errores:</strong>
          <ul className="mb-0 mt-2">
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </div>
      )}

      <div className="row g-4 mt-1">
        {/* TABLA DE APRENDICES (ARRIBA) */}
        <div className="col-12">
          <div className="panel-card">
            <div className="panel-header">
              <div className="panel-title">
                <i className="bi bi-list-ul"></i> Aprendices registrados
                <span className="count-badge">{filtered.length}</span>
              </div>
              <div className="search-box">
                <i className="bi bi-search"></i>
                <input
                  type="search"
                  placeholder="Buscar aprendiz..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-modern align-middle">
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>ID</th>
                    <th>Aprendiz</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Curso / Ficha</th>
                    <th>Computador</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map(a => (
                      <tr key={a.id}>
                        <td><span className="id-pill">#{a.id}</span></td>
                        <td>
                          <Link to={`/apprentice/${a.id}`} className="text-decoration-none text-reset">
                            <div className="cell-main" style={{ textTransform: 'capitalize' }}>{a.name}</div>
                            <div className="cell-sub">{a.course ? `Ficha ${a.course.course_number}` : 'Sin ficha'}</div>
                          </Link>
                        </td>
                        <td>
                          <div className="cell-line">
                            <i className="bi bi-envelope me-1"></i>
                            <span>{a.email}</span>
                          </div>
                        </td>
                        <td>
                          <div className="cell-line">
                            <i className="bi bi-telephone me-1"></i>
                            <span>{a.number}</span>
                          </div>
                        </td>
                        <td>{a.course?.course_number ? a.course.course_number : '—'}</td>
                        <td>{a.computer?.number ? `Equipo ${a.computer.number}` : '—'}</td>
                        <td className="text-end">
                          <div className="action-group">
                            <Link to={`/apprentice/${a.id}`} className="btn-icon" title="Ver detalles">
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link to={`/apprentice/${a.id}/edit`} className="btn-icon" title="Editar">
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button type="button" className="btn-icon btn-icon-danger" title="Eliminar" onClick={() => handleDelete(a.id)}>
                              <i className="bi bi-trash3"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">
                        <div className="empty-state text-center py-4">
                          <i className="bi bi-people display-4 text-muted"></i>
                          <h6 className="mt-2">No hay aprendices registrados</h6>
                          <p className="text-muted small">Diligencia el formulario de abajo para agregar uno.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FORMULARIO DE REGISTRO (ABAJO) */}
        <div className="col-12">
          <div className="panel-card" id="module-form">
            <div className="panel-header">
              <div className="panel-title"><i className="bi bi-plus-circle me-1"></i> Registrar aprendiz</div>
            </div>
            <div className="panel-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="f-control has-icon">
                      <label className="label-modern" htmlFor="name">Nombre completo</label>
                      <i className="field-icon bi bi-person"></i>
                      <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Ej: Maria Gomez" />
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <div className="f-control has-icon">
                      <label className="label-modern" htmlFor="email">Correo electrónico</label>
                      <i className="field-icon bi bi-envelope"></i>
                      <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="Ej: alumno@misena.edu.co" />
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <div className="f-control has-icon">
                      <label className="label-modern" htmlFor="number">Número de teléfono</label>
                      <i className="field-icon bi bi-telephone"></i>
                      <input type="text" id="number" name="number" value={form.number} onChange={handleChange} placeholder="Ej: 3001234567" />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="f-control has-icon">
                      <label className="label-modern" htmlFor="course_id">Curso / Ficha</label>
                      <i className="field-icon bi bi-journal-text"></i>
                      <select id="course_id" name="course_id" value={form.course_id} onChange={handleChange}>
                        <option value="">Seleccione un curso</option>
                        {courses.map(c => (
                          <option key={c.id} value={c.id}>{c.course_number}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="f-control has-icon">
                      <label className="label-modern" htmlFor="computer_id">Equipo de cómputo</label>
                      <i className="field-icon bi bi-pc-display"></i>
                      <select id="computer_id" name="computer_id" value={form.computer_id} onChange={handleChange}>
                        <option value="">Seleccione un equipo</option>
                        {computers.map(c => (
                          <option key={c.id} value={c.id}>Equipo {c.number} — {c.brand}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-modern btn-modern-green w-100 justify-content-center">
                  <i className="bi bi-check2-circle me-1"></i> Guardar aprendiz
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}