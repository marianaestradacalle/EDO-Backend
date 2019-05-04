import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { EncargadoService } from '../../services/encargado/encargado.service';
import { async } from 'rxjs/internal/scheduler/async';
import bodyParser = require('body-parser');

@Controller('encargado')
export class EncargadoController {
  constructor(private encargadoService: EncargadoService) {
  }

  @Post()
  async agregarEncargado(@Body() body) {
    return await this.encargadoService.registrarEncargado(body);
  }

  @Get(':cc')
  // tslint:disable-next-line:no-empty
  async mostrarEncargado(@Param('cc') cc) {
    return await this.encargadoService.getEncargado(cc);
  }

  @Get()
  async mostrarEncargados() {
    return await this.encargadoService.getAllEncargados();
  }

  @Put()
  // tslint:disable-next-line:no-empty
  async actualizarEncargado(@Body() body) {
  return await this.encargadoService.updateEncargado(body);
  }

  @Delete(':cc')
  // tslint:disable-next-line:no-empty
  // Se pone @Params porque el dato como parametro se esta obteniendo de la ruta
  async eliminarEncargado(@Param('cc') cc) {
  return await this.encargadoService.deleteEncargado(cc);
  }

  @Post('login')
  login(@Body() body) {
    // tslint:disable-next-line:no-console
    console.log(body);
    return this.encargadoService.loginEncargado(body.cc, body.contrasena);
  }

}
