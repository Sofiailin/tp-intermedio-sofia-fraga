import { Router } from 'express';
import * as petController from '../controllers/pet.controller';
import { authenticate, authorize } from '../middlewares/auth';
import { UserRole } from '../types/auth';

const router = Router();

/**
 * GET /api/pets
 * Acceso: Todos los logueados (Dueño ve solo lo suyo, Vet ve todo)
 */
router.get('/', authenticate, petController.getPets);

/**
 * POST /api/pets
 * Acceso: Solo Veterinarios y Admins
 */
router.post(
  '/', 
  authenticate, 
  authorize([UserRole.ADMIN, UserRole.VETERINARIO]), 
  petController.createPet
);

export default router;