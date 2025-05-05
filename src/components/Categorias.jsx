import React, { useState } from 'react';

const Categorias = () => {
  const [categorias, setCategorias] = useState(['Alquiler', 'Comida', 'Transporte']);
  const [nuevaCategoria, setNuevaCategoria] = useState('');

  const agregarCategoria = () => {
    if (nuevaCategoria.trim()) {
      setCategorias([...categorias, nuevaCategoria]);
      setNuevaCategoria('');
    }
  };

  const eliminarCategoria = (categoria) => {
    setCategorias(categorias.filter((cat) => cat !== categoria));
  };

  return (
    <div className='container mt-4'>
      <h3>Gestión de Categorías</h3>
      <input
        type='text'
        placeholder='Nueva categoría'
        className='form-control my-2'
        value={nuevaCategoria}
        onChange={(e) => setNuevaCategoria(e.target.value)}
      />
      <button className='btn btn-success' onClick={agregarCategoria}>
        Agregar
      </button>
      <ul className='list-group mt-3'>
        {categorias.map((cat, index) => (
          <li key={index} className='list-group-item d-flex justify-content-between'>
            {cat}
            <button className='btn btn-danger btn-sm' onClick={() => eliminarCategoria(cat)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categorias;
