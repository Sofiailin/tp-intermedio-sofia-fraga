import { Pet, IPet } from '../models/Pet';
import { UserRole } from '../types/auth';

/**
 * Crea una mascota vinculada a un dueño
 */
export const createPet = async (
  nombre: string,
  especie: string,
  edad: number,
  duenioId: string
): Promise<string> => {
  const newPet = new Pet({
    nombre,
    especie,
    edad,
    duenio: duenioId
  });

  const savedPet = await newPet.save();
  return savedPet._id.toString();
};

/**
 * Obtiene mascotas con lógica de negocio por rol
 */
export const getAllPets = async (
  userId: string,
  role: UserRole
): Promise<IPet[]> => {
  // Si es DUEÑO, solo ve las suyas
  if (role === UserRole.DUENIO) {
    return await Pet.find({ duenio: userId }).lean();
  }

  // Si es ADMIN o VETERINARIO, ve todas y traemos datos del dueño (populate)
  return await Pet.find().populate('duenio', 'username email').lean();
};