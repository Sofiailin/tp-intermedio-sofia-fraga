import { Request, Response } from 'express';
import * as petService from '../services/pet.service';
import { validationResult } from 'express-validator';
import { Pet } from '../models/Pet'; 

export const createPet = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, especie, edad, duenioId } = req.body;

    if (!duenioId) {
       return res.status(400).json({ error: 'Falta el ID del dueño' });
    }

    const newPetId = await petService.createPet(nombre, especie, edad, duenioId);
    return res.status(201).json({ message: 'Mascota creada', id: newPetId });
  } catch (error: any) {
    return res.status(500).json({ error: 'Error al crear la mascota' });
  }
};

export const getPets = async (req: Request, res: Response) => {
  try {
    // (req as any) evita que TypeScript se queje
    const reqAny = req as any;
    
    if (!reqAny.user) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const userId = reqAny.user.id;
    const userRole = reqAny.user.role; 

    const pets = await petService.getAllPets(userId, userRole);
    return res.json(pets);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener mascotas' });
  }
};

// Actualizar mascota (PATCH)
export const updatePet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reqAny = req as any; 

    // Buscamos la mascota y verificamos que sea del dueño
    const pet = await Pet.findOneAndUpdate(
      { _id: id, duenio: reqAny.user?.id }, // Solo si le pertenece al usuario logueado
      req.body,
      { new: true } // Para que devuelva el dato actualizado
    );

    if (!pet) return res.status(404).json({ error: 'Mascota no encontrada o no tenés permiso' });
    return res.json(pet);
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar' });
  }
};

// Eliminar mascota (DELETE)
export const deletePet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reqAny = req as any; // Usamos el truco de nuevo

    const pet = await Pet.findOneAndDelete({ _id: id, duenio: reqAny.user?.id });

    if (!pet) return res.status(404).json({ error: 'Mascota no encontrada o no tenés permiso' });
    return res.json({ message: 'Mascota eliminada exitosamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar' });
  }
};