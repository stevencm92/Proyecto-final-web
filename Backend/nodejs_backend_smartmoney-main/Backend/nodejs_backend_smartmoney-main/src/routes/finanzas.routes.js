import { Router } from 'express';
import { metodosCategoria } from '../controllers/categoria.controller.js';
import { metodosTransaccion } from '../controllers/transaccion.controller.js';
import { metodosUsuario } from '../controllers/usuario.controller.js';

import cors from 'cors';
const router = Router();

router.post(
  '/api/Usuario/Login',
  cors({
    origin: 'http://localhost:8081',
  }),
  metodosUsuario.LoginUsuario
);

router.post(
  '/api/Usuario/Register',
  cors({
    origin: 'http://localhost:8081',
  }),
  metodosUsuario.RegistrarUsuario
);

router.get(
  '/api/Usuario/ObtenerCedulaPorEmail',
  cors({
    origin: 'http://localhost:8081',
  }),
  metodosUsuario.obtenerCedulaPorEmail
);

router.post(
  '/api/Transaccion/guardar',
  cors({
    origin: 'http://localhost:8081',
  }),
  metodosTransaccion.guardarTransaccion
);

router.get(
  '/api/Transaccion/mensuales',
  cors({
    origin: 'http://localhost:8081',
  }),
  metodosTransaccion.getTransaccionesMensuales
);

router.get(
  '/api/Transaccion/listar',
  cors({
    origin: 'http://localhost:8081',
  }),
  metodosTransaccion.getTransacciones
);

router.get(
  '/api/Categoria/ObtenerCategorias',
  cors({
    origin: 'http://localhost:8081',
  }),
  metodosCategoria.obtenerCategorias
);

router.post(
  '/api/Categoria/Save',
  cors({
    origin: 'http://localhost:8081',
  }),
  metodosCategoria.crearCategoria
);

export default router;
