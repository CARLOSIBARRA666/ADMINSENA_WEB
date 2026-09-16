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
  { id: 1, course_number: '2654567', day: 'Lunes a Viernes', area_id: 1, training_center_id: 1, created_at: '2026-03-15T08:30:00' },
  { id: 2, course_number: '2389012', day: 'Lunes a Miercoles', area_id: 2, training_center_id: null, created_at: '2026-05-22T14:00:00' },
]

const formatDate = (iso) => {
  const d = new Date(iso)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

const formatTime = (iso) => {
  const d = new Date(iso)
  let h = d.getHours()
  const m = String(d.getMinutes()).padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  return `${h}:${m} ${ampm}`
}

export default function CourseShow() {
  const { id } = useParams()
  const navigate = useNavigate()

  const course = coursesMock.find(c => c.id === Number(id))
  if (!course) return null

  const areaName = areasMock.find(a => a.id === course.area_id)?.name || '—'
  const centerName = trainingCentersMock.find(c => c.id === course.training_center_id)?.name || '—'

  const handleDelete = () => {
    if (!window.confirm('¿Seguro que deseas eliminar este curso?')) return
    navigate('/courses')
  }

  return (
    <div className="admin-module py-2">
      <div className="module-header">
        <div className="d-flex align-items-center gap-3">
          <div className="module-icon"><i className="bi bi-journal-text"></i></div>
          <div>
            <div className="module-eyebrow">Operacion Academica</div>
            <h1 className="module-title">Curso / Ficha</h1>
            <p className="module-subtitle">Detalle de la ficha academica seleccionada.</p>
          </div>
        </div>
        <Link to="/courses" className="btn-modern"><i className="bi bi-arrow-left"></i> Volver al listado</Link>
      </div>

      <div className="row g-4 mt-1">
        <div className="col-lg-7">
          <div className="panel-card">
            <div className="panel-header">
              <div className="panel-title"><i className="bi bi-info-circle"></i> Detalles del registro</div>
              <span className="badge-status"><i className="bi bi-check-circle-fill"></i> Activo</span>
            </div>
            <div className="panel-body">
              <div className="detail-item">
                <span className="detail-label">ID</span>
                <span className="detail-value">#{course.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Numero de curso</span>
                <span className="detail-value">Ficha {course.course_number}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Dia</span>
                <span className="detail-value">{course.day}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Area de formacion</span>
                <span className="detail-value">{areaName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Centro de formacion</span>
                <span className="detail-value">{centerName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Fecha de creacion</span>
                <span className="detail-value">
                  {formatDate(course.created_at)}
                  <small>{formatTime(course.created_at)}</small>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="panel-card">
            <div className="panel-header">
              <div className="panel-title"><i className="bi bi-lightning-charge"></i> Acciones</div>
            </div>
            <div className="panel-body d-flex flex-column gap-2">
              <Link to={`/courses/${course.id}/edit`} className="btn-modern btn-modern-green w-100 justify-content-center">
                <i className="bi bi-pencil"></i> Editar curso
              </Link>
              <button type="button" onClick={handleDelete} className="btn-modern btn-modern-danger w-100 justify-content-center">
                <i className="bi bi-trash3"></i> Eliminar curso
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}