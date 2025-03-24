import { Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';

function App() {

  return (

    <>
      {/* rutas de la pagina */}
      <Routes>
        {/* El contenedor general con el header y aside */}
        <Route element={<Layout />} >
          {/* Paginas */}
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </>

  )
}

export default App
