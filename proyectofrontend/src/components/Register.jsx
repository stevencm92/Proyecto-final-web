import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.jpeg';

function Register() {
  const [cedula, setCedula] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const user = {
      Cedula: cedula,
      NombreUsuario: username,
      CorreoElectronico: email,
      ContrasenaHash: password,
    };

    try {
      const response = await fetch('http://localhost:3000/api/Usuario/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        navigate('/');
      } else {
        const data = await response.json();
        alert(data.message || 'Error al registrar el usuario.');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Ocurrió un error en el servidor.');
    }
  };

  return (
    <div className=''>
      <div className='container'>
        <div className='card o-hidden border-0 shadow-lg my-5'>
          <div className='card-body p-0'>
            <div className='row'>
              <div className='col-lg-5 d-none d-lg-block bg-register-image'>
                <img src={Logo} className='img-fluid' alt='Responsive image' />
              </div>
              <div className='col-lg-7'>
                <div className='p-5'>
                  <div className='text-center'>
                    <h1 className='h4 text-gray-900 mb-4'>Crea una cuenta!</h1>
                  </div>
                  <form className='user' onSubmit={handleRegister}>
                    <div className='form-group'>
                      <input
                        type='text'
                        className='form-control form-control-user'
                        placeholder='C�dula'
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='text'
                        className='form-control form-control-user'
                        placeholder='Nombre'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='email'
                        className='form-control form-control-user'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className='form-group row'>
                      <div className='col-sm-6 mb-3 mb-sm-0'>
                        <input
                          type='password'
                          className='form-control form-control-user'
                          placeholder='Password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className='col-sm-6'>
                        <input
                          type='password'
                          className='form-control form-control-user'
                          placeholder='Repeat Password'
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <button className='btn btn-primary btn-user btn-block' type='submit'>
                      Register Account
                    </button>
                  </form>
                  <hr />

                  <div className='text-center'>
                    <Link className='small' to='/'>
                      Ya tienes cuenta? Login!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
