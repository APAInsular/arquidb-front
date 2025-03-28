import { Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import ExpedientContenxt from './store/contexts/ExpedientContenxt';

function App() {

  return (

    <>
      <ExpedientContenxt>
        {/* rutas de la pagina */}
        <Routes>
          {/* El contenedor general con el header y aside */}
          <Route element={<Layout />} >
            {/* Paginas */}
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </ExpedientContenxt>
    </>

  )
}

export default App
