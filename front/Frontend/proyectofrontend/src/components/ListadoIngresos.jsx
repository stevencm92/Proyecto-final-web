import React from 'react';

const ListadoIngresos = () => {
  // Datos ficticios de transacciones
  const transacciones = [
    { tipo: 'Ingreso', valor: 5000, categoria: 'Salario' },
    { tipo: 'Egreso', valor: 200, categoria: 'Alimentación' },
    { tipo: 'Egreso', valor: 150, categoria: 'Transporte' },
    { tipo: 'Ingreso', valor: 300, categoria: 'Freelance' },
    { tipo: 'Egreso', valor: 100, categoria: 'Entretenimiento' },
    { tipo: 'Egreso', valor: 50, categoria: 'Salud' },
    { tipo: 'Ingreso', valor: 700, categoria: 'Inversiones' },
  ];

  return (
    <div className='container mt-5'>
      <h3 className='text-center'>Listado de Ingresos/Egresos</h3>
      <ul className='list-group'>
        {transacciones.map((transaccion, index) => (
          <li key={index} className='list-group-item'>
            {transaccion.tipo}: ${transaccion.valor} - {transaccion.categoria}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListadoIngresos;
