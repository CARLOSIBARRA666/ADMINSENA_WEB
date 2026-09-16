import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const COURSES_STORAGE_KEY = 'adminsena_courses'

const initialCourses = [
  { id: 1, course_number: '2654567', day: 'Lunes a Viernes', area_id: 1, training_center_id: 1 },
  { id: 2, course_number: '2389012', day: 'Lunes a Miercoles', area_id: 2, training_center_id: null },
]

const areasMock = [
  { id: 1, name: 'Programacion' },
  { id: 2, name: 'Redes y comunicaciones' },
  { id: 3, name: 'Diseno' },
]

const trainingCentersMock = [
  { id: 1, name: 'Centro de Gestion y Desarrollo de Tecnologias' },
  { id: 2, name: 'Centro de Diseno y Metrologia' },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem(COURSES_STORAGE_KEY)

    if (!savedCourses) return initialCourses

    try {
      const parsedCourses = JSON.parse(savedCourses)
      return Array.isArray(parsedCourses) ? parsedCourses : initialCourses
    } catch {
      return initialCourses
    }
  })

  const [search, setSearch] = useState('')
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState([])

  const [form, setForm] = useState({
    course_number: '',
    day: '',
    area_id: '',
    training_center_id: '',
  })

  useEffect(() => {
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses))
  }, [courses])

  const areaName = (id) => areasMock.find(a => a.id === id)?.name || '—'
  const centerName = (id) => trainingCentersMock.find(c => c.id === id)?.name || '—'

  const filtered = courses.filter(c =>
    c.course_number.toLowerCase().includes(search.toLowerCase()) ||
    c.day.toLowerCase().includes(search.toLowerCase()) ||
    areaName(c.area_id).toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = []

    if (!form.course_number.trim()) newErrors.push('El campo Numero de curso es obligatorio')
    if (!form.day.trim()) newErrors.push('El campo Dia es obligatorio')

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors([])

    const newCourse = {
      id: Date.now(),
      course_number: form.course_number.trim(),
      day: form.day.trim(),
      area_id: form.area_id ? Number(form.area_id) : null,
      training_center_id: form.training_center_id ? Number(form.training_center_id) : null,
    }

    setCourses(previousCourses => [newCourse, ...previousCourses])
    setSuccess('Curso guardado correctamente')
    setForm({ course_number: '', day: '', area_id: '', training_center_id: '' })

    setTimeout(() => setSuccess(''), 4000)
  }

  const handleDelete = (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este curso?')) return
    setCourses(previousCourses => previousCourses.filter(c => c.id !== id))
    setSuccess('Curso eliminado correctamente')
    setTimeout(() => setSuccess(''), 4000)
  }

  return (
    <div className="admin-module py-2">
      <div className="module-header">
        <div className="d-flex align-items-center gap-3">
          <div className="module-icon"><i className="bi bi-journal-text"></i></div>
          <div>
            <div className="module-eyebrow">Operacion Academica</div>
            <h1 className="module-title">Cursos / Fichas</h1>
            <p className="module-subtitle">Administra las fichas academicas, su area y su centro de formacion.</p>
          </div>
        </div>
        <a href="#module-form" className="btn-modern"><i className="bi bi-plus-lg"></i> Nuevo Curso</a>
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

        {/* Listado */}
        <div className="col-xl-8">
          <div className="panel-card">
            <div className="panel-header">
              <div className="panel-title">
                <i className="bi bi-list-ul"></i> Cursos registrados
                <span className="count-badge">{filtered.length}</span>
              </div>
              <div className="search-box">
                <i className="bi bi-search"></i>
                <input
                  type="search"
                  placeholder="Buscar curso o ficha..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-modern align-middle">
                <thead>
                  <tr>
                    <th style={{ width: '90px' }}>ID</th>
                    <th>Numero de curso</th>
                    <th>Dia</th>
                    <th>Area</th>
                    <th>Centro</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map(c => (
                      <tr key={c.id}>
                        <td><span className="id-pill">#{c.id}</span></td>
                        <td>
                          <Link to={`/courses/${c.id}`} className="text-decoration-none text-reset">
                            <div className="cell-main">Ficha {c.course_number}</div>
                          </Link>
                        </td>
                        <td>
                          <div className="cell-line">
                            <i className="bi bi-calendar3"></i>
                            <span>{c.day}</span>
                          </div>
                        </td>
                        <td>{areaName(c.area_id)}</td>
                        <td>{centerName(c.training_center_id)}</td>
                        <td className="text-end">
                          <div className="action-group">
                            <Link to={`/courses/${c.id}`} className="btn-icon" title="Ver detalles">
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link to={`/courses/${c.id}/edit`} className="btn-icon" title="Editar">
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button type="button" className="btn-icon btn-icon-danger" title="Eliminar" onClick={() => handleDelete(c.id)}>
                              <i className="bi bi-trash3"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">
                        <div className="empty-state">
                          <i className="bi bi-journal-text"></i>
                          <h6>Aún no hay cursos registrados</h6>
                          <p>Registra la primera ficha academica desde el formulario.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="col-xl-4">
          <div className="panel-card" id="module-form">
            <div className="panel-header">
              <div className="panel-title"><i className="bi bi-plus-circle"></i> Registrar curso</div>
            </div>
            <div className="panel-body">
              <form onSubmit={handleSubmit}>
                <div className="f-control has-icon mb-3">
                  <label className="label-modern" htmlFor="course_number">Numero de curso</label>
                  <i className="field-icon bi bi-hash"></i>
                  <input type="text" id="course_number" name="course_number" value={form.course_number} onChange={handleChange} placeholder="Ej: 2654567" />
                </div>

                <div className="f-control has-icon mb-3">
                  <label className="label-modern" htmlFor="day">Dia</label>
                  <i className="field-icon bi bi-calendar3"></i>
                  <input type="text" id="day" name="day" value={form.day} onChange={handleChange} placeholder="Ej: Lunes a Viernes" />
                </div>

                <div className="f-control has-icon mb-3">
                  <label className="label-modern" htmlFor="area_id">Area de formacion</label>
                  <i className="field-icon bi bi-layers"></i>
                  <select id="area_id" name="area_id" value={form.area_id} onChange={handleChange}>
                    <option value="">Seleccione un area</option>
                    {areasMock.map(a => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>

                <div className="f-control has-icon mb-4">
                  <label className="label-modern" htmlFor="training_center_id">Centro de formacion</label>
                  <i className="field-icon bi bi-buildings"></i>
                  <select id="training_center_id" name="training_center_id" value={form.training_center_id} onChange={handleChange}>
                    <option value="">Seleccione un centro</option>
                    {trainingCentersMock.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn-modern btn-modern-green w-100 justify-content-center">
                  <i className="bi bi-check2-circle"></i> Guardar curso
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}