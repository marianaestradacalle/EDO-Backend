import { Controller, Put, Get, Delete, Post, Body, Param } from '@nestjs/common';
import { TarjetaService } from '../../services/tarjeta/tarjeta.service';

@Controller('tarjeta')
export class TarjetaController {
  constructor(private tarjetaService: TarjetaService) {
  }

  @Post()
  async agregarTarjeta(@Body() body) {
    return await this.tarjetaService.addTarjeta(body);
  }

  @Get(':codigo')
  mostrarTarjeta(@Param('codigo') codigo) {
    return this.tarjetaService.getTarjeta(codigo);
  }

  @Put()
  actualizarTarjeta(@Body() body) {

  }

  @Delete(':codigo')
  eliminarTarjeta(@Param('codigo') codigo) {
    return this.tarjetaService.deleteTarjeta(codigo);
  }
}
