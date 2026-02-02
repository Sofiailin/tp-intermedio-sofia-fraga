import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller';

const router = Router();

// POST /api/auth/register
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
  ],
  authController.register
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  authController.login
);

export default router;