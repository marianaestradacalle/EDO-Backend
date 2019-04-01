import { Controller, Post, Body, Get, Put, Delete } from '@nestjs/common';
import { EncargadoService } from '../../services/encargado/encargado.service';

@Controller('encargado')
export class EncargadoController {
  constructor(private encargadoService: EncargadoService) {
  }

  @Post()
  async agregarEncargado(@Body() body) {
    return await this.encargadoService.registrarEncargado(body);
  }

  @Get()
  mostrarEncargado() {

  }

  @Put()
  actualizarEncargado() {

  }

  @Delete()
  eliminarEncargDO() {

  }

}
