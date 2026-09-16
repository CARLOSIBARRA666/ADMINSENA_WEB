import { useState } from 'react'
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'

const coursesMock = [
  { id: 1, course_number: '2456789' },
  { id: 2, course_number: '1234567' },
]

const computersMock = [
  { id: 1, number: 'PC-001', brand: 'Lenovo' },
  { id: 2, number: 'PC-002', brand: 'HP' },
]

const apprenticesMock = [
  { id: 1, name: 'Maria Gomez', email: 'maria@misena.edu.co', number: '3001234567', course_id: 1, computer_id: 1 },
  { id: 2, name: 'Juan Perez', email: 'juan@misena.edu.co', number: '3007654321', course_id: 2, computer_id: null },
]

const APPRENTICES_STORAGE_KEY = 'adminsena_apprentices'

export default function ApprenticeForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const isEdit = Boolean(id)
  const isView = isEdit && !location.pathname.endsWith('/edit')

  const savedApprentices = JSON.parse(localStorage.getItem(APPRENTICES_STORAGE_KEY) || '[]')
  const existing = isEdit
    ? [...savedApprentices, ...apprenticesMock].find(a => a.id === Number(id))
    : null

  const [form, setForm] = useState({
    name: existing?.name || '',
    email: existing?.email || '',
    number: existing?.number || '',
    course_id: existing?.course_id ? String(existing.course_id) : '',
    computer_id: existing?.computer_id ? String(existing.computer_id) : '',
  })
  const [errors, setErrors] = useState([])

  if (isView) {
    if (!existing) {
      return (
        <div className="edit-wrap pt-2">
          <div className="alert alert-warning">No se encontró la información de este aprendiz.</div>
          <Link to="/apprentice" className="btn-modern btn-modern-outline">
            <i className="bi bi-arrow-left"></i> Volver al listado
          </Link>
        </div>
      )
    }

    return (
      <div className="admin-module py-2">
        <div className="module-header">
          <div className="d-flex align-items-center gap-3">
            <div className="module-icon"><i className="bi bi-person-vcard"></i></div>
            <div>
              <div className="module-eyebrow">Operacion Academica</div>
              <h1 className="module-title">Detalle del aprendiz</h1>
              <p className="module-subtitle">Información completa del aprendiz registrado.</p>
            </div>
          </div>
          <Link to="/apprentice" className="btn-modern btn-modern-outline">
            <i className="bi bi-arrow-left"></i> Volver al listado
          </Link>
        </div>

        <div className="panel-card mt-4">
          <div className="panel-header">
            <div className="panel-title"><i className="bi bi-person-circle"></i> {existing.name}</div>
            <span className="badge-status"><i className="bi bi-check-circle-fill"></i> Registrado</span>
          </div>
          <div className="panel-body">
            <div className="row g-3">
              <div className="col-md-6"><div className="detail-item"><span className="detail-label">ID</span><span className="detail-value">#{existing.id}</span></div></div>
              <div className="col-md-6"><div className="detail-item"><span className="detail-label">Nombre completo</span><span className="detail-value">{existing.name}</span></div></div>
              <div className="col-md-6"><div className="detail-item"><span className="detail-label">Correo electrónico</span><span className="detail-value">{existing.email}</span></div></div>
              <div className="col-md-6"><div className="detail-item"><span className="detail-label">Teléfono</span><span className="detail-value">{existing.number}</span></div></div>
              <div className="col-md-6"><div className="detail-item"><span className="detail-label">Curso / ficha</span><span className="detail-value">{existing.course?.course_number || 'Sin ficha asignada'}</span></div></div>
              <div className="col-md-6"><div className="detail-item"><span className="detail-label">Equipo</span><span className="detail-value">{existing.computer ? `Equipo ${existing.computer.number} - ${existing.computer.brand}` : 'Sin equipo asignado'}</span></div></div>
            </div>
            <div className="d-flex justify-content-end mt-4">
              <Link to={`/apprentice/${existing.id}/edit`} className="btn-modern btn-modern-green">
                <i className="bi bi-pencil"></i> Editar aprendiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = []
    if (!form.name.trim()) newErrors.push('El campo Nombre es obligatorio')
    if (!form.email.trim()) newErrors.push('El campo Correo es obligatorio')
    if (!form.number.trim()) newErrors.push('El campo Numero es obligatorio')

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors([])
    navigate('/apprentice')
  }

  const handleDelete = () => {
    if (!confirm('Seguro que deseas eliminar este aprendiz?')) return
    navigate('/apprentice')
  }

  return (
    <>
      <div className="edit-wrap pt-2">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/apprentice" className="btn-modern btn-modern-outline">
            <i className="bi bi-arrow-left"></i> Volver al listado
          </Link>
        </div>

        {errors.length > 0 && (
          <div className="alert alert-danger">
            <strong><i className="bi bi-exclamation-triangle-fill me-2"></i>Por favor corrige los siguientes errores:</strong>
            <ul className="mb-0 mt-2">
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        )}

        <div className="panel-card">
          <div className="panel-header">
            <div className="panel-title">
              <i className="bi bi-pencil-square"></i> {isEdit ? 'Editar aprendiz' : 'Registrar aprendiz'}
            </div>
          </div>
          <div className="panel-body">
            <form onSubmit={handleSubmit}>
              <div className="f-control has-icon mb-3">
                <label className="label-modern" htmlFor="name">Nombre completo</label>
                <i className="field-icon bi bi-person"></i>
                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
              </div>

              <div className="f-control has-icon mb-3">
                <label className="label-modern" htmlFor="email">Correo electronico</label>
                <i className="field-icon bi bi-envelope"></i>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
              </div>

              <div className="f-control has-icon mb-3">
                <label className="label-modern" htmlFor="number">Numero de telefono</label>
                <i className="field-icon bi bi-telephone"></i>
                <input type="text" id="number" name="number" value={form.number} onChange={handleChange} required />
              </div>

              <div className="f-control has-icon mb-3">
                <label className="label-modern" htmlFor="course_id">Curso / Ficha</label>
                <i className="field-icon bi bi-journal-text"></i>
                <select id="course_id" name="course_id" value={form.course_id} onChange={handleChange}>
                  <option value="">Seleccione un curso</option>
                  {coursesMock.map(c => (
                    <option key={c.id} value={c.id}>{c.course_number}</option>
                  ))}
                </select>
              </div>

              <div className="f-control has-icon mb-4">
                <label className="label-modern" htmlFor="computer_id">Equipo de computo</label>
                <i className="field-icon bi bi-pc-display"></i>
                <select id="computer_id" name="computer_id" value={form.computer_id} onChange={handleChange}>
                  <option value="">Seleccione un equipo</option>
                  {computersMock.map(c => (
                    <option key={c.id} value={c.id}>Equipo {c.number} {" \u2014 "} {c.brand}</option>
                  ))}
                </select>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <Link to="/apprentice" className="btn-modern btn-modern-outline">Cancelar</Link>
                <button type="submit" className="btn-modern btn-modern-green">
                  <i className="bi bi-check2-circle"></i> {isEdit ? 'Actualizar aprendiz' : 'Guardar aprendiz'}
                </button>
              </div>
            </form>

            {isEdit && (
              <div className="mt-4 border-top pt-4">
                <button type="button" className="btn-modern btn-modern-danger w-100 justify-content-center" onClick={handleDelete}>
                  <i className="bi bi-trash3"></i> Eliminar aprendiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}