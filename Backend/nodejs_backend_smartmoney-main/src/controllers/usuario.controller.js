import bcrypt from 'bcryptjs/dist/bcrypt.js';
import getConnection from '../database/database.js';

const LoginUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    const connection = await getConnection();

    // Buscar al usuario en la base de datos por correo electrónico
    const [rows] = await connection.query('SELECT * FROM usuarios WHERE CorreoElectronico = ?', [email]);
    const usuario = rows[0];

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar la contraseña usando bcryptjs
    const passwordIsValid = bcrypt.compareSync(password, usuario.ContrasenaHash);

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    // Si todo está correcto, devolver una respuesta exitosa
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

const RegistrarUsuario = async (req, res) => {
  const { Cedula, NombreUsuario, CorreoElectronico, ContrasenaHash } = req.body;

  console.log('Datos recibidos:', { Cedula, NombreUsuario, CorreoElectronico, ContrasenaHash });

  try {
    const connection = await getConnection();
    console.log('Conexión a la base de datos establecida');

    // Validar que la cédula no esté registrada
    const [cedulaExists] = await connection.query('SELECT * FROM Usuarios WHERE Cedula = ?', [Cedula]);
    console.log('Resultado de la consulta de cédula:', cedulaExists);
    if (cedulaExists.length > 0) {
      console.log('La cédula ya está registrada');
      return res.status(400).json({ message: 'La cédula ya está registrada.' });
    }

    // Validar que el correo no esté registrado
    const [emailExists] = await connection.query('SELECT * FROM Usuarios WHERE CorreoElectronico = ?', [
      CorreoElectronico,
    ]);
    console.log('Resultado de la consulta de correo electrónico:', emailExists);
    if (emailExists.length > 0) {
      console.log('El correo ya está registrado');
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    // Encriptar la contraseña usando bcryptjs
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(ContrasenaHash, salt);
    console.log('Contraseña encriptada:', hashedPassword);

    // Insertar el nuevo usuario en la base de datos
    const result = await connection.query(
      'INSERT INTO Usuarios (Cedula, NombreUsuario, CorreoElectronico, ContrasenaHash, FechaRegistro) VALUES (?, ?, ?, ?, ?)',
      [Cedula, NombreUsuario, CorreoElectronico, hashedPassword, new Date()]
    );
    console.log('Resultado de la inserción:', result);

    // Devolver respuesta exitosa
    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Método ObtenerCedulaPorEmail
const obtenerCedulaPorEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const connection = await getConnection();

    const [rows] = await connection.query('SELECT Cedula FROM Usuarios WHERE CorreoElectronico = ?', [email]);

    if (rows.length > 0) {
      res.status(200).json({ Cedula: rows[0].Cedula });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: err.message });
  }
};

export const metodosUsuario = {
  LoginUsuario,
  RegistrarUsuario,
  obtenerCedulaPorEmail,
};
