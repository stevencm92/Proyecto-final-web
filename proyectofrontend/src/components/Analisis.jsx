import { useEffect, useState } from 'react';

const Analisis = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const cedula = localStorage.getItem('cedulaUsuario');
        if (!cedula) {
          console.error('Cédula no encontrada en localStorage');
          return;
        }

        // Obtener transacciones
        const transRes = await fetch(`http://localhost:3000/api/Transaccion/listar?cedula=${cedula}`);
        if (!transRes.ok) throw new Error('Error al obtener transacciones');
        const transData = await transRes.json();

        // Obtener categorías
        const catRes = await fetch('http://localhost:3000/api/Categoria/ObtenerCategorias');
        if (!catRes.ok) throw new Error('Error al obtener categorías');
        const catData = await catRes.json();

        setTransacciones(transData);
        setCategorias(catData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, []);

  const ingresos = transacciones.filter((t) => t.Tipo === 'Ingreso');
  const egresos = transacciones.filter((t) => t.Tipo === 'Egreso');
  const totalIngresos = ingresos.reduce((acc, curr) => acc + parseFloat(curr.Valor), 0);
  const totalEgresos = egresos.reduce((acc, curr) => acc + parseFloat(curr.Valor), 0);
  const ahorro = totalIngresos - totalEgresos;
  const porcentajeAhorro = totalIngresos > 0 ? (ahorro / totalIngresos) * 100 : 0;

  // Crear mapa de ID → NombreCategoria
  const categoriaMap = categorias.reduce((map, cat) => {
    map[cat.ID] = cat.NombreCategoria;
    return map;
  }, {});

  const gastoPorCategoria = egresos.reduce((acc, curr) => {
    const nombre = categoriaMap[curr.CategoriaID] || `Categoría ${curr.CategoriaID}`;
    acc[nombre] = (acc[nombre] || 0) + parseFloat(curr.Valor);
    return acc;
  }, {});

  return (
    <div className='container mt-5'>
      <h3 className='text-center'>Análisis Financiero</h3>
      {loading ? (
        <p className='text-center'>Cargando datos...</p>
      ) : (
        <>
          <div className='row'>
            <div className='col-md-6'>
              <div className='card bg-success text-white p-3'>
                <h5>Promedio de Ingresos</h5>
                <p className='fs-4'>${(totalIngresos / ingresos.length || 0).toFixed(2)}</p>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='card bg-danger text-white p-3'>
                <h5>Promedio de Gastos</h5>
                <p className='fs-4'>${(totalEgresos / egresos.length || 0).toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-md-6'>
              <div className='card bg-info text-white p-3'>
                <h5>Porcentaje de Ahorro</h5>
                <p className='fs-4'>{porcentajeAhorro.toFixed(2)}%</p>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='card bg-warning text-white p-3'>
                <h5>Relación Ingresos/Gastos</h5>
                <p className='fs-4'>{totalIngresos >= totalEgresos ? 'Positivo' : 'Negativo'}</p>
              </div>
            </div>
          </div>
          <div className='mt-3'>
            <h5>Gasto Promedio por Categoría</h5>
            <ul className='list-group'>
              {Object.entries(gastoPorCategoria).map(([nombre, valor], index) => (
                <li key={index} className='list-group-item'>
                  {nombre}: ${valor.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Analisis;
