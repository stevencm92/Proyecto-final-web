import React from 'react';

const Analisis = () => {
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

  const ingresos = transacciones.filter((t) => t.tipo === 'Ingreso');
  const egresos = transacciones.filter((t) => t.tipo === 'Egreso');
  const totalIngresos = ingresos.reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
  const totalEgresos = egresos.reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
  const ahorro = totalIngresos - totalEgresos;
  const porcentajeAhorro = (ahorro / totalIngresos) * 100;

  const gastoPorCategoria = egresos.reduce((acc, curr) => {
    acc[curr.categoria] = (acc[curr.categoria] || 0) + parseFloat(curr.valor);
    return acc;
  }, {});

  return (
    <div className='container mt-5'>
      <h3 className='text-center'>Análisis Financiero</h3>
      <div className='row'>
        <div className='col-md-6'>
          <div className='card bg-success text-white p-3'>
            <h5>Promedio de Ingresos</h5>
            <p className='fs-4'>${(totalIngresos / ingresos.length).toFixed(2)}</p>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='card bg-danger text-white p-3'>
            <h5>Promedio de Gastos</h5>
            <p className='fs-4'>${(totalEgresos / egresos.length).toFixed(2)}</p>
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
          {Object.entries(gastoPorCategoria).map(([categoria, valor], index) => (
            <li key={index} className='list-group-item'>
              {categoria}: ${valor.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Analisis;
