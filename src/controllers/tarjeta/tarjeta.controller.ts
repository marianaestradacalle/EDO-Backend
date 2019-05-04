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

  @Get()
  mostrarTarjetas() {
    return this.tarjetaService.getAllTarjeta();
  }

  @Put()
  actualizarTarjeta(@Body() body) {
    return this.tarjetaService.updateTarjeta(body);
  }

  @Delete(':codigo')
  eliminarTarjeta(@Param('codigo') codigo) {
    return this.tarjetaService.deleteTarjeta(codigo);
  }
}
