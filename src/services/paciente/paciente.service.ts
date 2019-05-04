import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { IPaciente } from '../../interfaces/ipaciente.interface';
import { CustomException } from '../../utils/custom-exception';
import { TarjetaService } from '../tarjeta/tarjeta.service';

@Injectable()
export class PacienteService {
  // @ts-ignore
  constructor(@InjectModel('Paciente') private  pacienteModel: Model, private  tarjetaService: TarjetaService) {
  }

  async addPaciente(paciente: IPaciente) {
    paciente.tarjeta = await this.tarjetaService.getTarjeta(paciente.tarjeta).then(value => value._id);
    let result;
    const newPaciente = new this.pacienteModel(paciente);
    result = await newPaciente.save().catch(reason => {
      throw CustomException.internalError(reason);
    });
    this.tarjetaService.addPaciente(paciente.tarjeta, result._id);
    return result;
  }

  async getAllPacientes() {
    let result;
    let exception: HttpException;

    await this.pacienteModel.find( (err, res) => {
      if (!res) {
        exception = CustomException.noResults('No hay pacientes registrados');
      } else if (err) {
        exception = CustomException.internalError(err);
      }
      result = res;
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async getPaciente(cc) {
    let result;
    let exception: HttpException;
    await this.pacienteModel.findOne({ cc }, (err, res) => {
      if (!res) {
        exception = CustomException.noResults(`No se ha encontrado un paciente con la cédula ${cc}`);
      } else if (err) {
        exception = CustomException.internalError(err);
      }
      result = res;
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async deletePaciente(cc) {
    let result;
    let exception: HttpException;
    await this.pacienteModel.findOneAndDelete({ cc }, (err, res) => {
      if (!res) {
        exception = CustomException.noResults(`No se ha encontrado un paciente con la cédula ${cc}`);
      } else if (err) {
        exception = CustomException.internalError(err);
      }
      result = res;
    });
    this.tarjetaService.deletePaciente(result._id);
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async updatePaciente(paciente: IPaciente) {
    let result;
    let exception: HttpException;
    if (paciente.tarjeta) {
      paciente.tarjeta = await this.tarjetaService.getTarjeta(paciente.tarjeta).then(value => value._id);
    }
    await this.pacienteModel.findOneAndUpdate({ cc: paciente.cc }, paciente, (err, res) => {
      if (!res) {
        exception = CustomException.noResults(`No se ha encontrado un paciente con la cédula ${paciente.cc}`);
      } else if (err) {
        exception = CustomException.internalError(err);
      }
      result = res;
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }
}
