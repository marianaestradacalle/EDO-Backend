import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const EventoSchema = new Schema({
    nombre: { type: String, required: true },
    inicio: { type: Date, required: true },
    dia: { type: Date, required: true },
    fin: { type: Date, required: false },
    descripcion: { type: String, required: true },
    paciente: { type: Schema.Types.ObjectId, ref: 'Paciente', required: true },
    recordar: { type: Boolean, default: false },
});
