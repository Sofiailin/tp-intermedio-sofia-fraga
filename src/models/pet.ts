import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user'; // Importamos la interfaz del usuario

export interface IPet extends Document {
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  duenio: IUser['_id']; // Referencia al ID del dueño
  historial: string[];
  createdAt: Date;
  updatedAt: Date;
}

const petSchema = new Schema<IPet>(
  {
    nombre: { type: String, required: true, trim: true },
    especie: { type: String, required: true },
    raza: { type: String, default: 'Mestizo' },
    edad: { type: Number, required: true },
    duenio: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    historial: [{ type: String }] // Array de notas médicas
  },
  { timestamps: true }
);

// Índices para búsquedas más rápidas 
petSchema.index({ duenio: 1 });
petSchema.index({ nombre: 1 });

export const Pet = mongoose.model<IPet>('Pet', petSchema);

// --- Funciones de Ayuda (Estilo Profe) ---

export const findPetsByOwner = async (ownerId: string) => {
  return await Pet.find({ duenio: ownerId }).populate('duenio', 'username email');
};

export const createPet = async (petData: Partial<IPet>) => {
  const newPet = new Pet(petData);
  return await newPet.save();
};