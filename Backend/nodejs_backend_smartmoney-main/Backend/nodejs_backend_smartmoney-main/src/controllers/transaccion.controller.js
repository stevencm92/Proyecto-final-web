import getConnection from '../database/database.js';

const guardarTransaccion = async (req, res) => {
  try {
    const connection = await getConnection();
    const nuevaTransaccion = req.body;
    nuevaTransaccion.FechaRegistro = new Date(); // Verificar que la categoría exista

    const [categoria] = await connection.query('SELECT * FROM Categorias WHERE ID = ?', [nuevaTransaccion.CategoriaID]);

    if (!categoria.length) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    } // Verificar que el usuario exista

    const [usuario] = await connection.query('SELECT * FROM Usuarios WHERE Cedula = ?', [
      nuevaTransaccion.CedulaUsuario,
    ]);

    if (!usuario.length) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    } // Insertar la transacción

    await connection.query('INSERT INTO Transacciones SET ?', [nuevaTransaccion]);

    res.status(200).json({ mensaje: 'Transacción registrada exitosamente', transaccion: nuevaTransaccion });
  } catch (error) {
    console.error('Error al guardar la transacción:', error);
    res.status(500).json({ error: 'Error al guardar la transacción' });
  }
};

const getTransaccionesMensuales = async (req, res) => {
  const { cedula } = req.query;
  try {
    const connection = await getConnection();
    const [resultados] = await connection.query(
      `SELECT tipo, SUM(valor) AS total FROM Transacciones WHERE cedulausuario = ? GROUP BY tipo`,
      [cedula]
    );

    const resumen = {
      ingresos: 0,
      egresos: 0,
    };

    resultados.forEach((fila) => {
      if (fila.tipo === 'Ingreso') {
        resumen.ingresos = fila.total;
      } else if (fila.tipo === 'Egreso') {
        resumen.egresos = fila.total;
      }
    });

    res.status(200).json(resumen);
  } catch (error) {
    console.error('Error al obtener totales por tipo:', error);
    res.status(500).json({ error: 'Error al obtener totales por tipo' });
  }
};

const getTransacciones = async (req, res) => {
  const { cedula } = req.query;
  try {
    const connection = await getConnection();
    const [transacciones] = await connection.query('SELECT * FROM Transacciones WHERE CedulaUsuario = ?', [cedula]);

    res.status(200).json(transacciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener transacciones' });
  }
};

export const metodosTransaccion = {
  guardarTransaccion,
  getTransaccionesMensuales,
  getTransacciones,
};
