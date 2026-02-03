import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import petRoutes from './routes/pet.routes';

const app = express();

// --- Middlewares Globales ---
// Permite que tu API reciba peticiones de otros dominios 
app.use(cors()); 

// Permite que Express entienda el formato JSON que va desde el Postman
app.use(express.json());

// --- Registro de Rutas ---

// 1. Rutas Públicas (Registro y Login)
app.use('/api/auth', authRoutes);

// 2. Rutas Protegidas (Mascotas - Requieren Token)
app.use('/api/pets', petRoutes);

// --- Ruta de Bienvenida (Opcional, para saber que el servidor vive) ---
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 API Veterinaria de Sofi funcionando',
    version: '1.0.0'
  });
});

// --- Manejo de Errores Global ---
// Si algo falla en cualquier ruta, este código atrapa el error para que no se caiga el servidor
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Algo salió mal en el servidor interno',
    details: err.message 
  });
});

export default app;