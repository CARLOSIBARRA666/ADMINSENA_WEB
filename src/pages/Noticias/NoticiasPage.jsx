import { useState } from 'react'

const newsData = [
  {
    slug: 'diplomado-calificacion-docente',
    title: 'Abre convocatoria de inscripciones para el nuevo ciclo academico',
    summary: 'Explora nuestros programas de formacion, conoce los requisitos e inicia tu proceso de inscripcion hoy mismo.',
    role: 'Aspirante',
    date: '24 de noviembre de 2026',
    image: 'https://www.ces.edu.co/content/uploads/fly-images/4078/universidad-ces-informacion-para-aspirantes-800x900-c.jpg',
    url: 'https://portal.senasofiaplus.edu.co/index.php/70-ayudas-rol/323-aspirante',
  },
  {
    slug: 'facultad-salud-jornada-comunidad',
    title: 'Talleres de refuerzo academico y bienestar institucional',
    summary: 'Participa en las jornadas formativas disenadas para potenciar tus habilidades profesionales y tu desarrollo personal.',
    role: 'Aprendiz',
    date: '22 de septiembre de 2026',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikWK9pg0kCQxWW0tjAzKkiHKSpfzaIf9TQLqF_DmGut6-xEmCdCbO26FF8PT8AlykVPOWEqHhvf0X4XwwAk3o0sLpWmRcCH8EimjV1TiZet5qY1-H9MClDDkuoIyCUzTBTfFwVtVQx6jphVDkafA-mikQeyjOciWOisXVWjw879T06eY6IRTtWFxb0/s1080/BIENVENIDA%20APRENDIZ%201.png',
    url: 'https://portal.senasofiaplus.edu.co/index.php/71-ayudas-rol/324-aprendiz',
  },
  {
    slug: 'ingenieros-univalle-aguila',
    title: 'Encuentro de egresados y rueda de oportunidades laborales',
    summary: 'Conectate con empresas aliadas, fortalece tu red de contactos y accede a exclusivas ofertas de empleo.',
    role: 'Egresado',
    date: '20 de septiembre de 2026',
    image: 'https://ape.sena.edu.co/imgLayout/Boletines%20de%20prensa/EXPOEMPLEO%20EGRESADO.jpeg',
    url: 'https://ape.sena.edu.co/personas/Paginas/Aprendices-y-Egresados-SENA.aspx',
  },
]

export default function NoticiasPage() {
  const [activeFilter, setActiveFilter] = useState('Todos')

  const filteredNews = activeFilter === 'Todos'
    ? newsData
    : newsData.filter(item => item.role === activeFilter)

  return (
    <>
      <section id="noticias" className="news-section">
        <div className="container">
          <div className="news-heading">
            <div>
              <span className="section-kicker">Noticias y actualidad</span>
              <h2 className="grid-section-title">Temas de interes</h2>
            </div>
            <div className="news-filters" role="group" aria-label="Filtrar noticias por perfil">
              {['Todos', 'Aspirante', 'Aprendiz', 'Egresado'].map(role => (
                <button
                  key={role}
                  type="button"
                  className={`news-filter ${activeFilter === role ? 'active' : ''}`}
                  onClick={() => setActiveFilter(role)}
                >
                  {role === 'Todos' ? 'Todos' : role === 'Aspirante' ? 'Aspirantes' : role === 'Aprendiz' ? 'Aprendices' : 'Egresados'}
                </button>
              ))}
            </div>
          </div>

          <div className="news-grid">
            {filteredNews.map((item, index) => (
              <a key={item.slug + index} className="news-card" href={item.url} target="_blank" rel="noopener noreferrer">
                <div className="news-image-wrap">
                  <img src={item.image} alt={item.title} className="news-image" />
                  <span className="news-role">{item.role}</span>
                </div>
                <div className="news-card-content">
                  <time>{item.date}</time>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <span className="news-read">Leer noticia <i className="fa-solid fa-arrow-right"></i></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}