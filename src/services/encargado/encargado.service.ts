import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { InjectModel } from '@nestjs/mongoose';
import { CustomException } from '../../utils/custom-exception';
import { IEncargado } from '../../interfaces/iencargado.interface';
import { PacienteService } from '../paciente/paciente.service';
import { EncryptPipe } from '../../pipes/encrypt.pipe';
import { error } from 'util';

@Injectable()
export class EncargadoService {
  // @ts-ignore
  constructor(@InjectModel('Encargado') private  encargadoModel: Model, private pacienteService: PacienteService) {
  }

  async registrarEncargado(encargado) {
    encargado.contrasena = new EncryptPipe().transform(encargado.contrasena);
    let result;
    let exception: HttpException;
    const newEncargado = new this.encargadoModel(encargado);
    result = await newEncargado.save().catch(reason => {
      exception = CustomException.internalError(reason);
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async agregarPaciente(ccEncargado, ccPaciente) {
    let result;
    let exception: HttpException;
    const paciente = await this.pacienteService.getPaciente(ccPaciente);
    this.encargadoModel.findOne({ cc: ccEncargado }, async (err, res) => {
      if (!res) {
        exception = CustomException.noResults(`No se ha encontrado un encargado con la cédula ${ccEncargado}`);
      } else if (err) {
        exception = CustomException.internalError(err);
      }
      res.Pacientes.push({ paciente: paciente._id });
      await res.save();
      result = res;
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async getEncargado(cc) {
    let result;
    let exception: HttpException;
    await this.encargadoModel.findOne({ cc }, (err, res) => {
      if (!res) {
        exception = CustomException.noResults(`No se ha encontrado un encargado con la cédula ${cc}`);
      } else if (err) {
        exception = CustomException.internalError(err);
      }
      result = res;
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async deleteEncargado(cc) {
    let result;
    let exception: HttpException;
    await this.encargadoModel.findOneAndDelete({ cc }, (err, res) => {
      if (!res) {
        exception = CustomException.noResults(`No se ha encontrado un encargado con la cédula ${cc}`);
      } else if (err) {
        exception = CustomException.internalError(err);
      }
      result = res;
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async updateEncargado(encargado: IEncargado) {
    let result;
    let exception: HttpException;
    await this.encargadoModel.findOneAndUpdate({ cc: encargado.cc }, (err, res) => {
      if (!res) {
        exception = CustomException.noResults(`No se ha encontrado un encargado con la cédula ${encargado.cc}`);
      } else if (err) {
        exception = CustomException.internalError(err);
      }
      result = res;
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async loginEncargado(ccEncargado, contrasena) {
    let result;
    let exception: HttpException;
    await this.encargadoModel.findOne({ cc: ccEncargado }, (err, res) => {
      if (err) {
        exception = CustomException.internalError(err);
      } else if (!res) {
        exception = CustomException.noResults(`No se ha encontrado un encargado con la cédula ${ccEncargado}`);
      }
      bcrypt.compare(contrasena, res.contrasena, (err1, res1) => {
        if (!res1) {
          exception = CustomException.noResults(`Contraseña incorrecta`);
        } else {
          result  = res;
        }
      });
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }
}
