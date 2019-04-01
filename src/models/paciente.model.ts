import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const PacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  cc: { type: String, required: true, unique: true },
  genero: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true, default: new Date() },
  tarjeta: { type: Schema.Types.ObjectId, ref: 'Tarjeta', required: false },
});
