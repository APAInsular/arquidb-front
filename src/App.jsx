import { Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Expediente from './pages/crud/Expediente/Expediente';
import VerExpediente from './pages/crud/Expediente/VerExpediente';
import CrearExpediente from './pages/crud/Expediente/CrearExpediente';
import Persona from './pages/Persona';
import Colegiado from './pages/crud/Colegiado/Colegiado';
import Cliente from './pages/crud/Cliente/Cliente';

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
          <Route path="/personas" element={<Persona />} />
          <Route path="/colegiados" element={<Colegiado />}></Route>
          <Route path="/clientes" element={<Cliente />}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>

  )
}

export default App
