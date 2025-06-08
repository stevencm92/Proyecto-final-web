import { useEffect, useState } from 'react';

const ListadoIngresos = () => {
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
        const response = await fetch(`http://localhost:3000/api/Transaccion/listar?cedula=${cedula}`);
        if (!response.ok) throw new Error('Error al obtener transacciones');
        const transData = await response.json();

        // Obtener categorías
        const catResponse = await fetch('http://localhost:3000/api/Categoria/ObtenerCategorias');
        if (!catResponse.ok) throw new Error('Error al obtener categorías');
        const catData = await catResponse.json();

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

  // Crear mapa de ID → NombreCategoria
  const categoriaMap = categorias.reduce((map, cat) => {
    map[cat.ID] = cat.NombreCategoria;
    return map;
  }, {});

  return (
    <div className='container mt-5'>
      <h3 className='text-center'>Listado de Ingresos/Egresos</h3>
      {loading ? (
        <p className='text-center'>Cargando transacciones...</p>
      ) : transacciones.length === 0 ? (
        <p className='text-center'>No hay transacciones registradas.</p>
      ) : (
        <ul className='list-group'>
          {transacciones.map((transaccion) => (
            <li key={transaccion.ID} className='list-group-item'>
              {transaccion.Tipo}: ${parseFloat(transaccion.Valor).toFixed(2)} -{' '}
              {categoriaMap[transaccion.CategoriaID] || `Categoría ${transaccion.CategoriaID}`} -{' '}
              {new Date(transaccion.FechaRegistro).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListadoIngresos;
