import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import NoticiasPage from './pages/Noticias/NoticiasPage'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ApprenticesList from './pages/Apprentices/ApprenticesList'
import ApprenticeForm from './pages/Apprentices/ApprenticeForm'
import CoursesPage from './pages/Courses/CoursesPage'
import CourseEdit from './pages/Courses/CourseEdit'
import CourseShow from './pages/Courses/CourseShow'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
      {/*inicio */}
        <Route index element={<Home />} />
        {/*noticias */}
        <Route path="noticias" element={<NoticiasPage />} />
        {/*aprendices */}
        <Route path="apprentice" element={<ApprenticesList />} />
        <Route path="apprentice/create" element={<ApprenticeForm />} />
        <Route path="apprentice/:id/edit" element={<ApprenticeForm />} />
        <Route path="apprentice/:id" element={<ApprenticeForm />} />
        {/*cursos y fichas */}
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:id/edit" element={<CourseEdit />} />
        <Route path="courses/:id" element={<CourseShow />} />
      </Route>
    </Routes>
  )
}

export default App
