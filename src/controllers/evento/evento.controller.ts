import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { EventoService } from './../../services/evento/evento.service';

@Controller('evento')
export class EventoController {
    constructor(private eventoService: EventoService){

    }
    @Post()
    async agregarEvento(@Body() body) {
      console.log('new evento', body);
      return await this.eventoService.registrar(body);
    }
  
    @Get(':id')
    getOne(@Param('id') id) {
      return this.eventoService.getOne(id);
    }
  
    @Get('/paciente/:paciente')
    mostrarTarjetas(@Param('paciente') paciente) {
      return this.eventoService.getAll(paciente);
    }  
}
