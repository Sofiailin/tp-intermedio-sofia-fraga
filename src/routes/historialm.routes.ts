import { Router } from 'express';
import * as historialmController from '../controllers/historialm.controller'; // <--- Nombre nuevo
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { UserRole } from '../types/auth';

const router = Router();

// POST: Crear consulta (Solo Veterinarios y Admins)
router.post(
  '/', 
  authenticate, 
  authorize([UserRole.VETERINARIO, UserRole.ADMIN]), 
  historialmController.createEntry
);

// GET: Ver historial de una mascota
// Ruta: /api/historialm/:petId
router.get(
  '/:petId', 
  authenticate, 
  historialmController.getHistoryByPet
);

export default router;