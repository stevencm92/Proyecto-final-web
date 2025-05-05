import React, { useState } from 'react';

const RegistroIngresos = () => {
  const [tipo, setTipo] = useState('Ingreso');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');

  // Datos ficticios de categorías
  const categorias = ['Alimentación', 'Transporte', 'Entretenimiento', 'Salud', 'Educación'];

  const registrarTransaccion = () => {
    // Aquí puedes agregar la lógica para registrar la transacción
    console.log({ tipo, valor, categoria });
    setValor('');
    setCategoria('');
  };

  return (
    <div className='container mt-5'>
      <h3 className='text-center'>Registro de Ingresos/Egresos</h3>
      <div className='input-group mb-3'>
        <select className='form-select' value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value='Ingreso'>Ingreso</option>
          <option value='Egreso'>Egreso</option>
        </select>
        <input
          type='number'
          className='form-control'
          placeholder='Valor'
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <select className='form-select' value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value=''>Seleccionar Categoría</option>
          {categorias.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button className='btn btn-primary' onClick={registrarTransaccion}>
          Registrar
        </button>
      </div>
    </div>
  );
};

export default RegistroIngresos;