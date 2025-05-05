import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import Logo from '../assets/Logo.jpeg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Para redirigir despu�s de un login exitoso

  // Funci�n para manejar el submit del login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear objeto con las credenciales de login
    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('https://localhost:7144/api/Usuario/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        // Si el login es exitoso, redirige al dashboard
        localStorage.setItem('emailUsuario', email);
        navigate('/dashboard');
      } else {
        // Si hay un error, muestra el mensaje de error
        const data = await response.json();
        setErrorMessage(data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      setErrorMessage('Ocurrio un error en el servidor.');
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
                        <Link className='small' to='/dashboard'>
                          Dashboard demo
                        </Link>
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
