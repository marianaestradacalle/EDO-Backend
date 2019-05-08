import { HttpService, Injectable } from '@nestjs/common';
import { TarjetaService } from '../tarjeta/tarjeta.service';
import { SensorGateway } from '../../gateways/sensor.gateway';
import { infoAPISMS } from '../../config/configSMS';

@Injectable()
export class AlertService {
  constructor(private tarjetaService: TarjetaService,
              private sensorGateway: SensorGateway,
              private readonly httpService: HttpService) {
  }

  async generarAlerta(codigoT) {
    let resp = null;
    const tarjeta = await this.tarjetaService.getTarjetaRFID(codigoT).then(value => { // obtenemos la informacion de la tarjeta
      this.sensorGateway.salidaP(value);
      const paciente = value.paciente;
      const numeros = paciente.familiares.map(familiar => {
        return familiar.telefono;
      });
      this.enviarMensaje(numeros, `${paciente.nombre} esta cerca de la salida`);
      resp = value;
    });
    return resp != null ? true : false;
  }

  enviarMensaje(numeros: String[], mensaje) {
    const accountSid = 'AC2012235f80a38e88f98a54e3c85d940a';
    const authToken = '1d8b99f7985bb0b759da72e5c472e060';
    const client = require('twilio')(accountSid, authToken);

    console.log('numeros', numeros);
    for (const num of numeros) {
      client.messages
        .create({
          body: mensaje,
          from: '+18032448304',
          to: num,
        })
        .then(message => console.log(message.sid));
    }
  }

}
