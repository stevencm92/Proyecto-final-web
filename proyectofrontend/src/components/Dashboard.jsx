import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [ingresos, setIngresos] = useState(0);
  const [egresos, setEgresos] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatosFinancieros = async () => {
      try {
        const email = localStorage.getItem('emailUsuario');
        if (!email) {
          console.error('No se encontró el email en localStorage');
          return;
        }

        const cedulaResponse = await fetch(`http://localhost:3000/api/Usuario/ObtenerCedulaPorEmail?email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!cedulaResponse.ok) throw new Error('Error al obtener la cédula');
        const cedulaData = await cedulaResponse.json();
        const cedula = cedulaData.Cedula;
        localStorage.setItem('cedulaUsuario', cedula);
        const transaccionesResponse = await fetch(`http://localhost:3000/api/Transaccion/mensuales?cedula=${cedula}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!transaccionesResponse.ok) throw new Error('Error al obtener transacciones');
        const transaccionesData = await transaccionesResponse.json();

        setIngresos(transaccionesData.ingresos || 0);
        setEgresos(transaccionesData.egresos || 0);
      } catch (error) {
        console.error('Error al obtener datos financieros:', error);
      } finally {
        setLoading(false);
      }
    }; // Asegúrate de que se llama correctamente

    fetchDatosFinancieros();
  }, []);

  const saldoDisponible = ingresos - egresos;

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-10'>
          <div className='card shadow'>
            <div className='card-header bg-primary text-white text-center'>
              <h3>Resumen Financiero</h3>
            </div>
            <div className='card-body'>
              {loading ? (
                <p className='text-center'>Cargando datos...</p>
              ) : (
                <div className='row text-center'>
                  <div className='col-md-4 mb-3'>
                    <div className='card bg-success text-white p-3'>
                      <h5>Saldo Disponible</h5>
                      <p className='fs-4'>${saldoDisponible}</p>
                    </div>
                  </div>
                  <div className='col-md-4 mb-3'>
                    <div className='card bg-info text-white p-3'>
                      <h5>Ingresos Totales</h5>
                      <p className='fs-4'>${ingresos}</p>
                    </div>
                  </div>
                  <div className='col-md-4 mb-3'>
                    <div className='card bg-danger text-white p-3'>
                      <h5>Egresos Totales</h5>
                      <p className='fs-4'>${egresos}</p>
                    </div>
                  </div>
                </div>
              )}
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
