import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white border-bottom py-2">
        <div className="container-fluid px-4 px-md-5">

          {/* LOGO */}
          <Link className="navbar-brand d-flex align-items-center me-4 gap-2" to="/">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR-02_uIyZgixneJO95679ck6zh1g0fgT3L1Bmzgesxg&s=10" 
              alt="Logo SENA" 
              height="35" 
            />
            <span className="fw-bold fs-2 text-dark mb-0" style={{ letterSpacing: '-0.3px' }}>
              Admin<span style={{ color: '#39A900' }}>SENA</span>
            </span>
          </Link>

          {/* BOTÓN RESPONSIVE */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flatNavbarSena"
            aria-controls="flatNavbarSena"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* CONTENIDO DEL NAVBAR */}
          <div className="collapse navbar-collapse" id="flatNavbarSena">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3 gap-lg-3 align-items-center">

              {/* INICIO */}
              <li className="nav-item">
                <Link className="nav-link fw-bold text-dark px-3" to="/" style={{ fontSize: '1.2rem' }}>
                  Inicio
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link fw-semibold text-secondary px-4" to="/noticias" style={{ fontSize: '1.2rem' }}>
                  Noticias
                </Link>
              </li>

              {/* QUIÉNES SOMOS */}
              <li className="nav-item">
                <a className="nav-link fw-semibold text-secondary px-4" href="#quienes-somos" style={{ fontSize: '1.2rem' }}>
                  ¿Quiénes Somos?
                </a>
              </li>

              {/* DROPDOWN: GESTIÓN BASE */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fw-semibold text-secondary px-2"
                  href="#!"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ fontSize: '1.2rem' }}
                >
                  Gestión Base
                </a>
                <ul className="dropdown-menu border-0 shadow-sm mt-2 rounded-3">
                  <li><Link className="dropdown-item py-2" to="/training-center" style={{ fontSize: '1rem' }}>Centros de Formación</Link></li>
                  <li><Link className="dropdown-item py-2" to="/area" style={{ fontSize: '1rem' }}>Áreas</Link></li>
                  <li><Link className="dropdown-item py-2" to="/equipos" style={{ fontSize: '1rem' }}>Equipos</Link></li>
                </ul>
              </li>

              {/* DROPDOWN: OPERACIÓN ACADÉMICA */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fw-semibold text-secondary px-2"
                  href="#!"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ fontSize: '1.2rem' }}
                >
                  Operación Académica
                </a>
                <ul className="dropdown-menu border-0 shadow-sm mt-2 rounded-3">
                  <li><Link className="dropdown-item py-2" to="/teachers" style={{ fontSize: '1rem' }}>Instructores</Link></li>
                  <li><Link className="dropdown-item py-2" to="/courses" style={{ fontSize: '1rem' }}>Cursos / Fichas</Link></li>
                  <li><Link className="dropdown-item py-2" to="/apprentice" style={{ fontSize: '1rem' }}>Aprendices</Link></li>
                  <li><hr className="dropdown-divider my-1" /></li>
                  <li><Link className="dropdown-item py-2" to="/course-teacher" style={{ fontSize: '1rem' }}>Asignación Cursos/Instructores</Link></li>
                </ul>
              </li>

            </ul>

            <div className="d-flex align-items-center ms-auto my-2 my-lg-0 gap-5">

              {/* BUSCADOR */}
              <form className="d-flex" role="search" style={{ maxWidth: '340px', width: '100%' }} onSubmit={e => e.preventDefault()}>
                <div className="input-group bg-light rounded-3 overflow-hidden ps-2 p-1 border-0 w-100">
                  <input
                    className="form-control border-0 bg-transparent ps-2 py-1 text-secondary shadow-none"
                    type="search"
                    placeholder="Buscar..."
                    aria-label="Search"
                    style={{ fontSize: '1.05rem' }}
                  />
                  <button className="btn btn-sena-accent px-3 d-flex align-items-center justify-content-center" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                  </button>
                </div>
              </form>

              {/* INICIAR SESIÓN */}
              <div className="dropdown">
                <button
                  className="btn btn-sena-accent px-3 py-2 d-flex align-items-center gap-3 flex-shrink-0 dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ fontSize: '1.1rem' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                  </svg>
                  Iniciar Sesión
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2">
                  <li><Link className="dropdown-item" to="/login?role=aprendiz">Aprendiz</Link></li>
                  <li><Link className="dropdown-item" to="/login?role=administrador">Administrador</Link></li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </nav>
    </>
  )
}