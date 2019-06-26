import { Controller, Put, Get, Delete, Post, Body } from '@nestjs/common';
import { SensorGateway } from '../../gateways/sensor.gateway';
import { AlertService } from '../../services/alert/alert.service';

@Controller('alerta')
export class AlertaController {

  constructor(private alertaService: AlertService) {
  }

  @Post()
  async agregarAlerta(@Body() body) {
    const tarjeta = body.tarjeta;
    let resp = null;
    await this.alertaService.generarAlerta(tarjeta)
      .then(value => {
        console.log('saasd  ', value);
        resp = value;
      });

    console.log('Tarjeta:', tarjeta);
    return resp ? '1' : '0';
  }

  @Get()
  mostrarAlerta() {

  }

  @Put()
  actualizarAlerta() {

  }

  @Delete()
  eliminarAlerta() {

  }
}
