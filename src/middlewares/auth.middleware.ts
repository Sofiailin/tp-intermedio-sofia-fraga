import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload, UserRole } from '../types/auth';

// Asegúrate de tener una clave secreta por defecto si no usas dotenv aún
const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta_para_desarrollo';


export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token or expired' });
    }
    // Guardamos el payload (id, username, role) en req.user
    req.user = decoded as JwtPayload;
    next();
  });
};

/**
 * Middleware de autorización adaptado a Veterinaria
 */
export const authorize = (roles: Array<UserRole>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Verificamos si el usuario existe en la req y si su rol está en la lista permitida
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acceso denegado: No tienes los permisos necesarios' });
    }
    next();
  };
};