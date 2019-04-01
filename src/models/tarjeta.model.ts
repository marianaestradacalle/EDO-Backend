import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const TarjetaSchema = new mongoose.Schema({
  codigo: {type: String, required: true, unique: true },
  paciente: {type: Schema.Types.ObjectId, ref: 'Paciente', required: false},
});
