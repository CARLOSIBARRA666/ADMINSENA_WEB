import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const areasMock = [
  { id: 1, name: 'Programacion' },
  { id: 2, name: 'Redes y comunicaciones' },
  { id: 3, name: 'Diseno' },
]

const trainingCentersMock = [
  { id: 1, name: 'Centro de Gestion y Desarrollo de Tecnologias' },
  { id: 2, name: 'Centro de Diseno y Metrologia' },
]

const coursesMock = [
  { id: 1, course_number: '2654567', day: 'Lunes a Viernes', area_id: 1, training_center_id: 1 },
  { id: 2, course_number: '2389012', day: 'Lunes a Miercoles', area_id: 2, training_center_id: null },
]

export default function CourseEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const existing = coursesMock.find(c => c.id === Number(id))

  const [form, setForm] = useState({
    course_number: existing?.course_number || '',
    day: existing?.day || '',
    area_id: existing?.area_id ? String(existing.area_id) : '',
    training_center_id: existing?.training_center_id ? String(existing.training_center_id) : '',
  })
  const [errors, setErrors] = useState([])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
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
    navigate('/courses')
  }

  return (
    <>
      <div className="admin-module py-2">
        <div className="edit-wrap">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <Link to="/courses" className="btn-modern btn-modern-outline">
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
              <div className="panel-title"><i className="bi bi-pencil-square"></i> Editar curso / ficha</div>
            </div>
            <div className="panel-body">
              <form onSubmit={handleSubmit}>
                <div className="f-control has-icon mb-3">
                  <label className="label-modern" htmlFor="course_number">Numero de curso</label>
                  <i className="field-icon bi bi-hash"></i>
                  <input type="text" id="course_number" name="course_number" value={form.course_number} onChange={handleChange} required />
                </div>

                <div className="f-control has-icon mb-3">
                  <label className="label-modern" htmlFor="day">Dia</label>
                  <i className="field-icon bi bi-calendar3"></i>
                  <input type="text" id="day" name="day" value={form.day} onChange={handleChange} required />
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

                <div className="d-flex justify-content-end gap-2">
                  <Link to="/courses" className="btn-modern btn-modern-outline">Cancelar</Link>
                  <button type="submit" className="btn-modern btn-modern-green">
                    <i className="bi bi-check2-circle"></i> Actualizar curso
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}