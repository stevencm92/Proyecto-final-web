import express from 'express';
import morgan from 'morgan';
import router from './routes/finanzas.routes.js';

import cors from 'cors';

const app = express();

// Configuración del puerto
app.set('port', process.env.PORT || 3000);

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:8081', // Permite solo el frontend en localhost:8081
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Para solicitudes preflight

// Middleware para logging y JSON
app.use(morgan('dev'));
app.use(express.json());

// Rutas - asegúrate de que se cargan después de configurar CORS
app.use(router);

// Exportar el módulo
export default app;
