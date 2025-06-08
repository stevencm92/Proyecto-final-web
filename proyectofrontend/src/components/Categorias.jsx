import { useEffect, useState } from 'react';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [loading, setLoading] = useState(true);

  // Obtener categorías desde el backend
  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/Categoria/ObtenerCategorias');
      if (!response.ok) throw new Error('Error al obtener categorías');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  // Agregar nueva categoría
  const agregarCategoria = async () => {
    if (!nuevaCategoria.trim()) return;

    try {
      const response = await fetch('http://localhost:3000/api/Categoria/Save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ NombreCategoria: nuevaCategoria }),
      });

      if (!response.ok) throw new Error('Error al guardar la categoría');
      setNuevaCategoria('');
      fetchCategorias(); // Recargar la lista
    } catch (error) {
      console.error('Error al agregar categoría:', error);
    }
  };

  return (
    <div className='container mt-4'>
      <h3>Gestión de Categorías</h3>

      <div className='input-group my-3'>
        <input
          type='text'
          placeholder='Nueva categoría'
          className='form-control'
          value={nuevaCategoria}
          onChange={(e) => setNuevaCategoria(e.target.value)}
        />
        <button className='btn btn-success' onClick={agregarCategoria}>
          Agregar
        </button>
      </div>

      {loading ? (
        <p>Cargando categorías...</p>
      ) : (
        <ul className='list-group'>
          {categorias.map((cat) => (
            <li key={cat.ID} className='list-group-item d-flex justify-content-between align-items-center'>
              {cat.NombreCategoria}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categorias;
