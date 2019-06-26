import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomException } from './../../utils/custom-exception';

@Injectable()
export class EventoService {

    //@ts-ignore
    constructor(@InjectModel('Evento') private eventoModel: Model) {
    }

    async  registrar(evento) {
        let result;
        let exception;
        result = await new this.eventoModel(evento).save().catch(reason => {
            exception = CustomException.internalError(reason)
        });
        return exception != null ? exception : result;
    }

    get(paciente) {

    }

    async  getOne(id) {
        return await this.eventoModel.findById(id);
    }

    async getAll(paciente) {
        return await this.eventoModel.find({ paciente });
    }
}
