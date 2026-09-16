import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <footer className="w-100 py-5 mt-5 text-white-50 style-solid-footer" style={{ backgroundColor: '#0c5c05' }}>
        <div className="container py-4">
          <div className="row g-4">

            <div className="col-lg-4 col-md-6">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-shield-check me-2 text-white" style={{ fontSize: '1.6rem' }}></i>
                <h5 className="fw-bold m-0 text-white">Admin<span style={{ color: '#38a9009a' }}>SENA</span></h5>
              </div>
              <p className="small lh-base mb-0" style={{ maxWidth: '320px' }}>
                Plataforma desarrollada para la administración, asignación y seguimiento de equipos de cómputo, ambientes formativos y fichas académicas de AdminSENA.
              </p>
            </div>

            <div className="col-lg-2 col-md-6 ms-lg-auto">
              <h6 className="fw-bold text-white mb-3" style={{ fontSize: '0.9rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Navegación</h6>
              <ul className="list-unstyled d-flex flex-column gap-2 small">
                <li><Link to="/" className="text-reset text-decoration-none hover-footer-link">Inicio</Link></li>
                <li><Link to="/training-center" className="text-reset text-decoration-none hover-footer-link">Centros de Formación</Link></li>
                <li><Link to="/area" className="text-reset text-decoration-none hover-footer-link">Áreas</Link></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-6">
              <h6 className="fw-bold text-white mb-3" style={{ fontSize: '0.9rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Enlaces Útiles</h6>
              <ul className="list-unstyled d-flex flex-column gap-2 small">
                <li><Link to="/teachers" className="text-reset text-decoration-none hover-footer-link">Instructores</Link></li>
                <li><Link to="/courses" className="text-reset text-decoration-none hover-footer-link">Cursos / Fichas</Link></li>
                <li><Link to="/apprentice" className="text-reset text-decoration-none hover-footer-link">Aprendices</Link></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6">
              <h6 className="fw-bold text-white mb-3" style={{ fontSize: '0.9rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Soporte</h6>
              <ul className="list-unstyled d-flex flex-column gap-2 small">
                <li>
                  <a href="mailto:soporte.adminsena@misena.edu.co" className="text-reset text-decoration-none hover-footer-link d-flex align-items-center gap-2">
                    <i className="bi bi-tools text-white"></i> Soporte Técnico
                  </a>
                </li>
                <li className="text-white-50 small mt-1">
                  <i className="bi bi-check-circle-fill text-success me-1"></i> AdminSENA © 2026 - Verificado
                </li>
              </ul>
            </div>

          </div>

          <hr className="my-4 border-white opacity-25" />

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 small">
            <div className="d-flex flex-wrap gap-4 text-center text-md-start justify-content-center">
              <span><i className="bi bi-building me-2"></i> Centro de Formación</span>
              <span><i className="bi bi-envelope me-2"></i> soporte.adminsena@misena.edu.co</span>
            </div>
            <div className="d-flex gap-3 fs-5">
              <a href="https://www.facebook.com/SENAColombia" className="text-reset hover-footer-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook del SENA"><i className="bi bi-facebook"></i></a>
              <a href="https://x.com/SENAComunica" className="text-reset hover-footer-link" target="_blank" rel="noopener noreferrer" aria-label="X del SENA"><i className="bi bi-twitter-x"></i></a>
              <a href="https://www.youtube.com/user/SENATV" className="text-reset hover-footer-link" target="_blank" rel="noopener noreferrer" aria-label="YouTube del SENA"><i className="bi bi-youtube"></i></a>
            </div>
          </div>

          <div className="text-center mt-4 pt-2 opacity-50" style={{ fontSize: '0.8rem' }}>
            &copy; 2026 AdminSENA - Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </>
  )
}
