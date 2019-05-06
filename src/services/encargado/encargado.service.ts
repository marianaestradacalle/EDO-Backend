import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { InjectModel } from '@nestjs/mongoose';
import { CustomException } from '../../utils/custom-exception';
import { IEncargado } from '../../interfaces/iencargado.interface';
import { PacienteService } from '../paciente/paciente.service';
import { EncryptPipe } from '../../pipes/encrypt.pipe';
import { error } from 'util';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class EncargadoService {
  // @ts-ignore
  constructor(
    // @ts-ignore
    @InjectModel('Encargado') private encargadoModel: Model,
    @Inject(forwardRef(() => PacienteService))
    private pacienteService: PacienteService,
  ) {
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
      console.log('res ap:', res, err);
      if (!res) {
        exception = CustomException.noResults(
          `No se ha encontrado un encargado con la cédula ${ccEncargado}`,
        );
      } else if (err) {
        exception = CustomException.internalError(err);
      }
      res.pacientes.push({ paciente: paciente._id });
      await res.save();
      result = res;
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async getAllEncargados() {
    let result;
    let exception: HttpException;
    await this.encargadoModel.find((err, res) => {
      if (!res) {
        exception = CustomException.noResults('No hay encargados');
      } else if (err) {
        exception = CustomException.internalError(err);
      }
      result = res;
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async getEncargado(cc) {
    let result;
    let exception: HttpException;
    await this.encargadoModel.findOne({ cc }, (err, res) => {
      if (!res) {
        exception = CustomException.noResults(
          `No se ha encontrado un encargado con la cédula ${cc}`,
        );
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
        exception = CustomException.noResults(
          `No se ha encontrado un encargado con la cédula ${cc}`,
        );
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
    await this.encargadoModel.findOneAndUpdate(
      { cc: encargado.cc },
      (err, res) => {
        if (!res) {
          exception = CustomException.noResults(
            `No se ha encontrado un encargado con la cédula ${encargado.cc}`,
          );
        } else if (err) {
          exception = CustomException.internalError(err);
        }
        result = res;
      },
    );
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async loginEncargado(ccEncargado, contrasena) {
    let result;
    let exception: HttpException;
    await this.encargadoModel.findOne({ cc: ccEncargado }, async (err, res) => {
      // tslint:disable-next-line:no-console
      console.log(res);
      if (err) {
        exception = CustomException.internalError(err);
      } else if (!res) {
        exception = CustomException.noResults(
          `No se ha encontrado un encargado con la cédula ${ccEncargado}`,
        );
      } else if (!bcrypt.compareSync(contrasena, res.contrasena)) {
        exception = CustomException.noResults(
          `incoreecta`,
        );
      } else {
        result = res
        ;
      }
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async getPacientes(id) {
    const pac = await this.encargadoModel.findById(id, 'pacientes')
      .populate('pacientes.paciente');
    return pac.pacientes;
  }
}
