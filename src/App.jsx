import { Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import ExpedientContenxt from './store/contexts/ExpedientContenxt';
import PhaseContext from './store/contexts/PhaseContext';
import Expediente from './pages/crud/Expediente/Expediente';
import VerExpediente from './pages/crud/Expediente/VerExpediente';
import CrearExpediente from './pages/crud/Expediente/CrearExpediente';
import Persona from './pages/Persona';
import Colegiado from './pages/crud/Colegiado/Colegiado';
import Cliente from './pages/crud/Cliente/Cliente';
import Profile from './pages/auth/Profile';
import VerUsuario from './pages/admin/usuarios/VerUsuario';
import VerColegiado from './pages/crud/Colegiado/VerColegiado';
import Usuarios from './pages/admin/usuarios/Usuarios';
import CrearColegiado from './pages/crud/Colegiado/CrearColegiado';
import VerCliente from './pages/crud/Cliente/VerCliente';
import CrearCliente from './pages/crud/Cliente/CrearCliente';
import ActualizarColegiado from './pages/crud/Colegiado/ActualizarColegiado';
import ActualizarCliente from './pages/crud/Cliente/ActualizarCliente';
import PageSearch from './pages/PageSearch';

function App() {

  return (

    <>
      <ExpedientContenxt>
        <PhaseContext>
          {/* rutas de la pagina */}
          <Routes>
            {/* El contenedor general con el header y aside */}
            <Route path="/" element={<Layout />} >
              {/* Paginas */}
              <Route path="/" element={<Dashboard />} />
              {/* usuario */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/expedientes" element={<Expediente />} />
              <Route path="/search/:search" element={<PageSearch />} />
              <Route path="/expedientes/:id" element={<VerExpediente />} />
              <Route path="/expedientes/crear" element={<CrearExpediente />} />
              <Route path="/personas" element={<Persona />} />
              <Route path="/colegiados" element={<Colegiado />} />
              <Route path="/colegiados/:id/show" element={<VerColegiado />}></Route>
              <Route path="/colegiados/:id/actualizar" element={<ActualizarColegiado />}></Route>
              <Route path="/colegiados/crear" element={<CrearColegiado />}></Route>
              <Route path="/clientes" element={<Cliente />} />
              <Route path="/clientes/:id/show" element={<VerCliente />}></Route>
              <Route path="/clientes/:id/actualizar" element={<ActualizarCliente />}></Route>
              <Route path="/clientes/crear" element={<CrearCliente />}></Route>
              <Route path="/usuarios" element={<Usuarios />}></Route>
              <Route path="/usuarios/:id/show" element={<VerUsuario />}></Route>
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </PhaseContext>
      </ExpedientContenxt>
    </>

  )
}

export default App
