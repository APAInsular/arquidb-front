import { Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import ExpedientContext from './store/contexts/ExpedientContext';
import PhaseContext from './store/contexts/PhaseContext';
import DocumentContext from './store/contexts/DocumentContext';
import Expediente from './pages/crud/Expediente/Expediente';
import VerExpediente from './pages/crud/Expediente/VerExpediente';
import CrearExpediente from './pages/crud/Expediente/CrearExpediente';
import EditarExpediente from './pages/crud/Expediente/EditarExpediente';
import Persona from './pages/Persona';
import Colegiado from './pages/crud/Colegiado/Colegiado';
import Cliente from './pages/crud/Cliente/Cliente';
import Profile from './pages/auth/Profile';
import Usuarios from './pages/admin/usuarios/Usuarios';
import VerUsuario from './pages/admin/usuarios/VerUsuario';
import VerColegiado from './pages/crud/Colegiado/VerColegiado';
import CrearColegiado from './pages/crud/Colegiado/CrearColegiado';
import VerCliente from './pages/crud/Cliente/VerCliente';
import CrearCliente from './pages/crud/Cliente/CrearCliente';
import ActualizarColegiado from './pages/crud/Colegiado/ActualizarColegiado';
import ActualizarCliente from './pages/crud/Cliente/ActualizarCliente';
import PageSearch from './pages/PageSearch';
import Fase from './pages/crud/Fase/Fase';
import CrearFase from './pages/crud/Fase/CrearFase';
import EditarFase from './pages/crud/Fase/EditarFase';
import Records from './pages/Records';
import CrearUsuario from './pages/admin/usuarios/CrearUsuario';
import ActualizarUsuario from './pages/admin/usuarios/ActualizarUsuario';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerFase from './pages/crud/Fase/VerFase';

function App() {

  return (

    <>
      <ExpedientContext>
        <PhaseContext>
          <DocumentContext>
            {/* rutas de la pagina */}
            <Routes>
              {/* El contenedor general con el header y aside */}
              <Route path="/" element={<Layout />} >
                {/* Paginas */}
                <Route path="/" element={<Dashboard />} />
                {/* usuario */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/historial" element={<Records />} />
                {/* posible eliminacion  */}
                {/* <Route path="/search" element={<PageSearch />} /> */}
                <Route path="/expedientes" element={<Expediente />} />
                <Route path="/expedientes/:id/show" element={<VerExpediente />} />
                <Route path="/expedientes/crear" element={<CrearExpediente />} />
                <Route path="/expedientes/:id/editar" element={<EditarExpediente />} />
                {/* <Route path="/personas" element={<Persona />} /> */}
                <Route path="/colegiados" element={<Colegiado />} />
                <Route path="/colegiados/:id/show" element={<VerColegiado />} />
                <Route path="/colegiados/:id/editar" element={<ActualizarColegiado />} />
                <Route path="/colegiados/crear" element={<CrearColegiado />} />
                <Route path="/clientes" element={<Cliente />} />
                <Route path="/clientes/:id/show" element={<VerCliente />} />
                <Route path="/clientes/:id/editar" element={<ActualizarCliente />} />
                <Route path="/clientes/crear" element={<CrearCliente />} />
                <Route path="/fases" element={<Fase />} />
                <Route path="/fases/crear" element={<CrearFase />} />
                <Route path="/fases/:id/editar" element={<EditarFase />} />
                <Route path="/fases/:id/show" element={<VerFase />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/usuarios/:id/show" element={<VerUsuario />} />
                <Route path="/usuarios/crear" element={<CrearUsuario />} />
                <Route path="/usuarios/:id/editar" element={<ActualizarUsuario />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </DocumentContext>
        </PhaseContext>
      </ExpedientContext>
    </>

  )
}

export default App
