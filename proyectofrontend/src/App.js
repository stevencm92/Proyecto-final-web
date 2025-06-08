import { Route, Routes } from 'react-router-dom';
import Analisis from './components/Analisis';
import Categorias from './components/Categorias';
import Dashboard from './components/Dashboard';
import ListadoIngresos from './components/ListadoIngresos';
import Login from './components/Login';
import Register from './components/Register';
import RegistroIngresos from './components/RegistroIngresos';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/categorias' element={<Categorias />} />
      <Route path='/registro_ingresos' element={<RegistroIngresos />} />
      <Route path='/listado_ingresos' element={<ListadoIngresos />} />
      <Route path='/analisis' element={<Analisis />} />
    </Routes>
  );
}

export default App;
