import * as mongoose from 'mongoose';
import { Document, Schema, Model, model } from 'mongoose';

export const EncargadoSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  cc: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  pacientes: { type: [{ paciente: { type: Schema.Types.ObjectId, ref: 'Paciente' } , relacion: { type: String, required: true, default: 'Encargado' }}], required: false },
  contrasena: {type: String, required: true},
});
