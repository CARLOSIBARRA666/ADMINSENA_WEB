import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  //boton volver arriba
  const [showScrollTop, setShowScrollTop] = useState(false)

  //
  const carouselImages = [
    'https://i.pinimg.com/736x/44/d0/9f/44d09f6fb02f5aeb7eee8edf6d839c86.jpg',
    'https://elestudiodeactores.com/wp-content/uploads/2023/04/el-sena-certifica-nuestros-actores.jpeg',
    'https://i.pinimg.com/1200x/cd/8c/4b/cd8c4bd165e9db4c1043b48d99839274.jpg',
  ]

  // 
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    // Limpia el evento al desmontar el componente
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // pagina con desplazamiento suave
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <main className="adminsena-landing">

        {/* --- SECCIÓN HERO --- */}
        <section className="hero-section">
          <div className="container hero-container">
            <div className="hero-content">
              <span className="badge-tag">
                <i className="fa-solid fa-laptop-code"></i>Gestion SENA
              </span>
              <h1 className="hero-title">Enfocado en Solucion y Modernizacion</h1>
              <p className="hero-subtitle">
                Control en tiempo real de recursos tecnologicos, ambientes de aprendizaje y programacion de fichas en un solo lugar.
              </p>
              <a href="#modulos" className="btn-primary-hero">Comenzar Ahora</a>
            </div>

            {/* carrusel */}
            <div className="carousel-hero">
              <div id="carruselSena" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
                <div className="carousel-indicators">
                  {carouselImages.map((_, i) => (
                    <button 
                      key={i} 
                      type="button" 
                      data-bs-target="#carruselSena" 
                      data-bs-slide-to={i} 
                      className={i === 0 ? 'active' : ''} 
                      aria-current={i === 0 ? 'true' : undefined}
                    ></button>
                  ))}
                </div>
                <div className="carousel-inner">
                  {carouselImages.map((src, i) => (
                    <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                      <img src={src} className="d-block w-100" alt={`Slide ${i + 1}`} />
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carruselSena" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carruselSena" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECCIÓN ¿QUÉ ES ADMINSENA? --- */}
        <section id="quienes-somos" className="welcome-section">
          <div className="container welcome-container">
            <div className="welcome-text-content">
              <h2 className="section-title">Que es AdminSENA?</h2>
              <p className="section-paragraph">
                Una solucion digital integral creada para simplificar la administracion de recursos en el SENA. Facilita el control preciso de activos tecnologicos, la organizacion horaria de los grupos y el seguimiento seguro de los espacios educativos.
              </p>
              <div className="welcome-buttons">
                <a href="#quienes-somos" className="btn-green-dark">
                  <i className="fa-solid fa-circle-info"></i>Explorar plataforma
                </a>
                <a href="https://www.sena.edu.co/" className="link-simple" target="_blank" rel="noopener noreferrer">Ver manual de uso</a>
              </div>
            </div>
            <div className="welcome-image-wrapper">
              <div className="main-image-card">
                <img src="https://cdn.colombia.com/sdi/2022/11/24/que-es-territorium-en-el-sena-1090764.jpg" alt="Ambiente SENA" className="img-fluid-rounded" />
              </div>
            </div>
          </div>
        </section>

        {/* --- SECCION MODULOS Y PILARES  --- */}
        <section id="modulos" className="cards-section">
          <div className="container">
            <h2 className="grid-section-title">Enfoque Profesional e Innovador</h2>
            <div className="rounded-cards-grid">
              
              <div className="rounded-card">
                <img src="https://www.wradio.com.co/resizer/v2/RGIAKSMRRNGU3OBW535ZJVXPHY.jpg?auth=6bb23eef45fc0d6e294d9289335d29c51964e91080ef949a23431f26d4861dd2" alt="Mision" className="card-img" />
                <div className="card-body-content">
                  <h3>Mision del Sistema</h3>
                  <p>Garantizar la trazabilidad precisa y el control eficiente de los equipos y recursos tecnologicos en todos los ambientes de formacion del SENA.</p>
                  <a href="#quienes-somos" className="btn-card-action">Ver Detalles</a>
                </div>
              </div>

              <div className="rounded-card">
                <img src="https://www.tropicanafm.com/wp-content/uploads/2026/01/05012026-Salario-aprendices-SENA.jpg" alt="Vision" className="card-img" />
                <div className="card-body-content">
                  <h3>Vision y Escalabilidad</h3>
                  <p>Impulsar la expansion del sistema hacia multiples centros y sedes con una infraestructura moderna, segura y adaptable.</p>
                  <a href="https://www.sena.edu.co/" className="btn-card-action" target="_blank" rel="noopener noreferrer">Plan de Ruta</a>
                </div>
              </div>

              <div className="rounded-card">
                <img src="https://www.agenciapi.co/sites/default/files/styles/imagen_principal_contenidos_2021/public/2024-10/sena%204%20octubre.jpg.webp?h=7d7e118b&itok=kadfvtXN" alt="Compromiso" className="card-img" />
                <div className="card-body-content">
                  <h3>Gestion de Fichas</h3>
                  <p>Centralizar la administracion de programas de formacion, optimizando la asignacion de instructores, aprendices, ambientes y horarios academicos.</p>
                  {/*Fichas/Cursos */}
                  <Link to="/courses" className="btn-card-action">Ir a Fichas</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* --- BOT0N FLOTANTE VOLVER ARRIBA --- */}
      <button 
        className={`btn-scroll-top ${showScrollTop ? 'show' : ''}`} 
        onClick={scrollToTop} 
        aria-label="Volver arriba"
      >
        &#8593;
      </button>
    </>
  )
}