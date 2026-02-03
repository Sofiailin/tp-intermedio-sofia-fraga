import { Pet, IPet } from '../models/Pet';
import { UserRole } from '../types/auth';

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

export const getAllPets = async (
  userId: string,
  role: UserRole
): Promise<IPet[]> => {
  if (role === UserRole.DUENIO) {
    // Si es dueño, solo ve sus propias mascotas
    return await Pet.find({ duenio: userId }).lean();
  }
  // Si es vet/admin, ve todas y trae info del dueño
  return await Pet.find().populate('duenio', 'username email').lean();
};