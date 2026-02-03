import express, { Request, Response } from 'express';
import path from 'path';
import 'dotenv/config';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import petRoutes from './routes/pet.routes';
import historialmRoutes from './routes/historialm.routes'; // <--- 1. Importamos las rutas nuevas
import { connectDB } from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// RUTAS
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/historialm', historialmRoutes); // <--- 2. Activamos la ruta del Historial

// Ruta de saludo (prueba)
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: '¡Servidor funcionando perfecto! 🚀' });
});

// ENCENDIDO DEL SERVIDOR
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`🩺 Historial Médico activo en /api/historialm`);
  });
});