import { Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import ExpedientContenxt from './store/contexts/ExpedientContenxt';
import Expediente from './pages/crud/Expediente/Expediente';
import VerExpediente from './pages/crud/Expediente/VerExpediente';
import CrearExpediente from './pages/crud/Expediente/CrearExpediente';
import Persona from './pages/Persona';
import Colegiado from './pages/crud/Colegiado/Colegiado';
import Cliente from './pages/crud/Cliente/Cliente';
import Usuarios from './pages/admin/usuarios/usuarios';
import Profile from './pages/auth/Profile';
import VerUsuario from './pages/admin/usuarios/VerUsuario';

function App() {

  return (

    <>
      <ExpedientContenxt>
        {/* rutas de la pagina */}
        <Routes>
          {/* El contenedor general con el header y aside */}
          <Route path="/" element={<Layout />} >
            {/* Paginas */}
            <Route path="/" element={<Dashboard />} />
            {/* usuario */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/expedientes" element={<Expediente />} />
            <Route path="/expedientes/:id" element={<VerExpediente />} />
            <Route path="/expedientes/crear" element={<CrearExpediente />} />
            <Route path="/personas" element={<Persona />} />
            <Route path="/colegiados" element={<Colegiado />} />
            <Route path="/clientes" element={<Cliente />} />
            <Route path="/usuarios" element={<Usuarios />}></Route>
            <Route path="/usuarios/:id/show" element={<VerUsuario />}></Route>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </ExpedientContenxt>
    </>

  )
}

export default App
