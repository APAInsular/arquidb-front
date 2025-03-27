import { Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Expediente from './pages/crud/Expediente/Expediente';
import VerExpediente from './pages/crud/Expediente/VerExpediente';
import CrearExpediente from './pages/crud/Expediente/CrearExpediente';

function App() {

  return (

    <>
      {/* rutas de la pagina */}
      <Routes>
        {/* El contenedor general con el header y aside */}
        <Route path="/" element={<Layout />} >
          {/* Paginas */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/expedientes" element={<Expediente />} />
          <Route path="/expedientes/:id" element={<VerExpediente />} />
          <Route path="/expedientes/crear" element={<CrearExpediente />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>

  )
}

export default App
