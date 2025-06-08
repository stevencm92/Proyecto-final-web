import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import Logo from '../assets/Logo.jpeg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Para redirigir despu�s de un login exitoso

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:3000/api/Usuario/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login exitoso:', data.message);
        localStorage.setItem('emailUsuario', email);
        navigate('/dashboard');
      } else {
        let errorText = 'Credenciales incorrectas';
        try {
          const data = await response.json();
          errorText = data.message || errorText;
        } catch {
          // Si no se puede parsear JSON
        }
        setErrorMessage(errorText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setErrorMessage('Ocurrió un error en el servidor.');
    }
  };

  return (
    <div>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-10 col-lg-12 col-md-9'>
            <div className='card o-hidden border-0 shadow-lg my-5'>
              <div className='card-body p-0'>
                <div className='row'>
                  <div className='col-lg-6 d-none d-lg-block bg-login-image '>
                    <img src={Logo} className='img-fluid' alt='Responsive image' />
                  </div>
                  <div className='col-lg-6'>
                    <div className='p-5'>
                      <div className='text-center'>
                        <h1 className='h4 text-gray-900 mb-4'>Bienvenido de nuevo!</h1>
                      </div>
                      <form className='user' onSubmit={handleSubmit}>
                        <div className='form-group'>
                          <input
                            type='email'
                            className='form-control form-control-user'
                            placeholder='Ingresa tu correo electr�nico'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className='form-group'>
                          <input
                            type='password'
                            className='form-control form-control-user'
                            placeholder='Contrase�a'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className='form-group'>
                          <div className='custom-control custom-checkbox small'>
                            <input type='checkbox' className='custom-control-input' id='customCheck' />
                            <label className='custom-control-label'>Recordarme</label>
                          </div>
                        </div>
                        <button type='submit' className='btn btn-primary btn-user btn-block'>
                          Iniciar sesi�n
                        </button>
                        {errorMessage && <div className='text-danger mt-3'>{errorMessage}</div>}
                      </form>
                      <hr />

                      <div className='text-center'>
                        <Link className='small' to='/register'>
                          Crea una cuenta!
                        </Link>
                        <br />
                      </div>
                    </div>
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

export default Login;
