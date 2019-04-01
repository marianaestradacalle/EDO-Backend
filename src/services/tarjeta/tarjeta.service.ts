import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CustomException } from '../../utils/custom-exception';
import { ITarjeta } from '../../interfaces/itajeta.interface';

@Injectable()
export class TarjetaService {

  // @ts-ignore
  constructor(@InjectModel('Tarjeta') private  tarjetaModel: Model) {
  }

  async addTarjeta(tarjeta: ITarjeta) {
    let result;
    let exception: HttpException;
    const newTarjeta = new this.tarjetaModel(tarjeta);
    result = await newTarjeta.save().catch(reason => {
      exception = CustomException.internalError(reason);
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async getTarjeta(codigo) {
    let result;
    let exception: HttpException;
    await this.tarjetaModel.findOne({ codigo }, (err, res) => {
      if (!res) {
        exception = CustomException.noResults(`No se ha encontrado un tarjeta con el código ${codigo}`);
      } else if (err) {
        exception = CustomException.internalError(err);
      }
      result = res;
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async deleteTarjeta(codigo) {
    let result;
    let exception: HttpException;
    await this.tarjetaModel.findOneAndDelete({ codigo }, (err, res) => {
      if (!res) {
        exception = CustomException.noResults(`No se ha encontrado un tarjeta con el código ${codigo}`);
      } else if (err) {
        exception = CustomException.internalError(err);
      }
      result = res;
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async updateTarjeta(tarjeta: ITarjeta) {
    let result;
    let exception: HttpException;
    await this.tarjetaModel.findOneAndUpdate({ codigo: tarjeta.codigo }, tarjeta, (err, res) => {
      if (!res) {
        exception = CustomException.noResults(`No se ha encontrado un tarjeta con el codigo ${tarjeta.codigo}`);
      } else if (err) {
        exception = CustomException.internalError(err);
      }
      result = res;
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async addPaciente(codigo, paciente) {
    let result;
    let exception: HttpException;
    await this.tarjetaModel.findOneAndUpdate({ _id: codigo }, { paciente }, (err, res) => {
      if (!res) {
        exception = CustomException.noResults(`No se ha encontrado un tarjeta con el codigo ${codigo}`);
      } else if (err) {
        exception = CustomException.internalError(err);
      }
      result = res;
    });
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async deletePaciente(idPaciente) {
    return await this.tarjetaModel.findOneAndUpdate({ paciente: idPaciente }, { paciente: undefined })
      .catch(err => {
        throw CustomException.internalError(err);
      });
  }
}
