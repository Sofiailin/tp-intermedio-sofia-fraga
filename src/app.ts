import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import petRoutes from './routes/pet.routes';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Registro de Rutas
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);

// Manejo de errores global (opcional pero recomendado para el 10)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

export default app;