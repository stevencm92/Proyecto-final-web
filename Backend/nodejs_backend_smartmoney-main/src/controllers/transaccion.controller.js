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
    const [transaccionesMensuales] = await connection.query(
      `
            SELECT 
                MONTH(fechaTransaccion) AS mes,
                YEAR(fechaTransaccion) AS anio,
                SUM(CASE WHEN tipoTransaccion = 'Ingreso' THEN monto ELSE 0 END) AS ingresos,
                SUM(CASE WHEN tipoTransaccion = 'Gasto' THEN monto ELSE 0 END) AS gastos
            FROM Transacciones
            WHERE cedula = ?
            GROUP BY mes, anio
            ORDER BY anio ASC, mes ASC
        `,
      [cedula]
    );

    res.status(200).json(transaccionesMensuales);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener transacciones mensuales' });
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
