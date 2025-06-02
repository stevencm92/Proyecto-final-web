import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Datos ficticios
  const saldoDisponible = 5000;
  const ingresosTotales = 15000;
  const egresosTotales = 10000;

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='card shadow'>
            <div className='card-header bg-primary text-white text-center'>
              <h3>Resumen Financiero</h3>
            </div>
            <div className='card-body'>
              <div className='row text-center'>
                <div className='col-md-4'>
                  <div className='card bg-success text-white p-3'>
                    <h5>Saldo Disponible</h5>
                    <p className='fs-4'>${saldoDisponible}</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='card bg-info text-white p-3'>
                    <h5>Ingresos Totales</h5>
                    <p className='fs-4'>${ingresosTotales}</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='card bg-danger text-white p-3'>
                    <h5>Egresos Totales</h5>
                    <p className='fs-4'>${egresosTotales}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer text-center'>
              <p className='text-muted'>Datos ficticios, no reales 🚀</p>
            </div>
          </div>
        </div>
      </div>

      {/* Módulos de navegación */}
      <div className='container mt-4'>
        <h3 className='text-center'>Módulos del Dashboard</h3>
        <div className='list-group'>
          <Link className='list-group-item list-group-item-action' to='/categorias'>
            📂 Categorías de Gastos
          </Link>
          <Link className='list-group-item list-group-item-action' to='/registro_ingresos'>
            💰 Registro de Ingresos/Egresos
          </Link>
          <Link className='list-group-item list-group-item-action' to='/listado_ingresos'>
            📝 Listado de Ingresos/Egresos
          </Link>
          <Link className='list-group-item list-group-item-action' to='/analisis'>
            📊 Análisis Financiero
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
