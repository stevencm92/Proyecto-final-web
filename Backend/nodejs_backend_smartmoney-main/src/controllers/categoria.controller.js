import getConnection from '../database/database.js';

const obtenerCategorias = async (req, res) => {
  try {
    const connection = await getConnection();
    const [categorias] = await connection.query('SELECT * FROM Categorias');
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

const crearCategoria = async (req, res) => {
  const nuevaCategoria = req.body;

  if (!nuevaCategoria || !nuevaCategoria.NombreCategoria) {
    return res.status(400).json({ error: 'Datos de categoría inválidos' });
  }

  try {
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO Categorias (NombreCategoria) VALUES (?)', [
      nuevaCategoria.NombreCategoria,
      nuevaCategoria.TipoCategoria,
    ]);

    nuevaCategoria.CategoriaID = result[0].insertId;
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

export const metodosCategoria = {
  obtenerCategorias,
  crearCategoria,
};
