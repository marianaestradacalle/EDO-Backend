import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { EventoService } from './../../services/evento/evento.service';

@Controller('evento')
export class EventoController {
    constructor(private eventoService: EventoService){

    }
    @Post()
    async agregarTarjeta(@Body() body) {
      return await this.eventoService.addTarjeta(body);
    }
  
    @Get(':codigo')
    mostrarTarjeta(@Param('codigo') codigo) {
      return this.eventoService.getTarjetaCodigo(codigo);
    }
  
    @Get()
    mostrarTarjetas() {
      return this.eventoService.getAllTarjeta();
    }
  
    @Put()
    actualizarTarjeta(@Body() body) {
      return this.eventoService.updateTarjeta(body);
    }
  
    @Delete(':codigo')
    eliminarTarjeta(@Param('codigo') codigo) {
      return this.eventoService.deleteTarjeta(codigo);
    }
}
