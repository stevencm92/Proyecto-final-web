import { useEffect, useState } from 'react';

const RegistroIngresos = () => {
  const [tipo, setTipo] = useState('Ingreso');
  const [valor, setValor] = useState('');
  const [categoriaID, setCategoriaID] = useState('');
  const [categorias, setCategorias] = useState([]);

  // Obtener categorías desde el backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/Categoria/ObtenerCategorias');
        if (!response.ok) throw new Error('Error al obtener categorías');
        const data = await response.json();

        setCategorias(data);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const registrarTransaccion = async () => {
    const cedula = localStorage.getItem('cedulaUsuario');
    console.log(categoriaID);
    console.log(cedula);
    if (!valor || !categoriaID || !cedula) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const transaccion = {
      Tipo: tipo,
      Valor: parseFloat(valor),
      CategoriaID: parseInt(categoriaID),
      CedulaUsuario: cedula,
    };

    try {
      const response = await fetch('http://localhost:3000/api/Transaccion/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaccion),
      });

      if (!response.ok) throw new Error('Error al registrar la transacción');
      alert('Transacción registrada con éxito');
      setValor('');
      setCategoriaID('');
    } catch (error) {
      console.error('Error al registrar transacción:', error);
      alert('Ocurrió un error al guardar la transacción');
    }
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
        <select className='form-select' value={categoriaID} onChange={(e) => setCategoriaID(e.target.value)}>
          <option value=''>Seleccionar Categoría</option>
          {categorias.map((cat) => (
            <option key={cat.ID} value={cat.ID}>
              {cat.NombreCategoria}
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
