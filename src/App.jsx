import { Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Expediente from './pages/crud/Expediente';

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
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>

  )
}

export default App
