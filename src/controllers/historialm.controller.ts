import { Request, Response } from 'express';
import { HistorialM } from '../models/HistorialM'; // <--- Nombre nuevo
import { Pet } from '../models/Pet';

// CREAR REGISTRO (Solo Veterinarios)
export const createEntry = async (req: Request, res: Response) => {
  try {
    const reqAny = req as any;
    const { petId, descripcion, diagnostico, tratamiento } = req.body;

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }

    const newEntry = new HistorialM({
      mascota: petId,
      veterinario: reqAny.user.id,
      descripcion,
      diagnostico,
      tratamiento
    });

    await newEntry.save();
    return res.status(201).json(newEntry);
  } catch (error) {
    return res.status(500).json({ error: 'Error al crear historial' });
  }
};

// VER HISTORIAL DE UNA MASCOTA
export const getHistoryByPet = async (req: Request, res: Response) => {
  try {
    const { petId } = req.params;
    const reqAny = req as any;

    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).json({ error: 'Mascota no encontrada' });

    // Validación de seguridad: Dueño solo ve SU mascota
    if (reqAny.user.role === 'duenio' && pet.duenio.toString() !== reqAny.user.id) {
      return res.status(403).json({ error: 'No tenés permiso para ver este historial' });
    }

    const history = await HistorialM.find({ mascota: petId })
      .populate('veterinario', 'username email')
      .sort({ fecha: -1 });

    return res.json(history);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener historial' });
  }
};