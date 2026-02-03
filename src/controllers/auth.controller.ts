import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { validationResult } from 'express-validator';

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Leemos "role" del cuerpo de la petición (req.body)
    const { username, email, password, role } = req.body;

    // Se lo pasamos al servicio
    await authService.register(username, email, password, role);

    return res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error: any) {
    // Error código 11000 es de MongoDB cuando algo se repite (email o usuario)
    if (error.code === 11000) {
      return res.status(409).json({ error: 'El usuario o email ya existe' });
    }
    return res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    return res.json({ token });
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
};