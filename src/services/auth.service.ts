import bcrypt from 'bcrypt';
import { User } from '../models/User'; 
import jwt from 'jsonwebtoken';
import { JwtPayload, UserRole } from '../types/auth';

const secretKey = process.env.JWT_SECRET || 'clave_secreta_provisoria';

export const register = async (username: string, email: string, password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role: UserRole.USER // Rol por defecto
  });

  const savedUser = await newUser.save();
  return savedUser._id.toString();
};

export const login = async (email: string, password: string): Promise<string> => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Credenciales inválidas');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Credenciales inválidas');

  const payload: JwtPayload = {
    id: user._id.toString(),
    username: user.username,
    role: user.role as UserRole,
  };

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};