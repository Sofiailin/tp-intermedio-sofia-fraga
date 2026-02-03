import { Router } from 'express';
import * as petController from '../controllers/pet.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { UserRole } from '../types/auth';

const router = Router();

// --- RUTAS ---

// GET: Ver mascotas (Requiere estar logueado)
router.get('/', authenticate, petController.getPets);

// POST: Crear mascota (Solo Admin y Veterinarios)
router.post(
  '/', 
  authenticate, 
  authorize([UserRole.ADMIN, UserRole.VETERINARIO]), 
  petController.createPet
);

// PATCH: Editar mascota (Requiere estar logueado y ser dueño)
router.patch('/:id', authenticate, petController.updatePet);

// DELETE: Borrar mascota (Requiere estar logueado y ser dueño)
router.delete('/:id', authenticate, petController.deletePet);

export default router;