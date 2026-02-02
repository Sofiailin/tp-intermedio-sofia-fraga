import { Request, Response } from 'express';
import * as petService from '../services/pet.service'; // Importamos el cocinero
import { validationResult } from 'express-validator';

export const createPet = async (req: Request, res: Response) => {
  try {
    // 1. REVISAR VALIDACIONES
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 2. EXTRAER DATOS
    const { nombre, especie, edad, duenioId } = req.body;

    // 3. PEDIR AL SERVICIO QUE HAGA EL TRABAJO
    const newPet = await petService.createPet(nombre, especie, edad, duenioId);

    // 4. RESPONDER AL CLIENTE
    return res.status(201).json(newPet);
  } catch (error: any) {
    return res.status(500).json({ error: 'Error al crear la mascota' });
  }
};

export const getPets = async (req: Request, res: Response) => {
  try {
    // El controlador extrae el ID y Rol del usuario que vienen del token (gracias al middleware)
    const userId = req.user?.id;
    const userRole = req.user?.role;

    // Le pide al servicio las mascotas filtradas
    const pets = await petService.getAllPets(userId, userRole);
    
    return res.json(pets);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener mascotas' });
  }
};