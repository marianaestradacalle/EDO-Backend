import * as mongoose from 'mongoose';
import { Document, Schema, Model, model } from 'mongoose';

export const EncargadoSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  cc: { type: String, required: true, unique: true },
  relacion: { type: String, required: true },
  telefono: { type: String, required: true },
  direccion: { type: String, required: true },
  pacientes: { type: [{ paciente: { type: Schema.Types.ObjectId, ref: 'Paciente' } }], required: false },
  contrasena: {type: String, required: true}
});
