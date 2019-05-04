import { PacienteService } from './../../services/paciente/paciente.service';
import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';

@Controller('paciente')
export class PacienteController {

  constructor(private pacienteService: PacienteService) {
  }

  @Post()
  agregarPaciente(@Body() body) {
    return this.pacienteService.addPaciente(body);
  }

  @Get(':cc')
  mostrarPaciente(@Param('cc') cc) {
    return this.pacienteService.getPaciente(cc);
  }

  @Get()
  mostrarPAcientes() {
    return this.pacienteService.getAllPacientes();
  }

  @Put()
  actualizarPaciente(@Body() body) {
    return this.pacienteService.updatePaciente(body);
  }

  @Delete(':cc')
  eliminarPaciente(@Param('cc') cc) {
    return this.pacienteService.deletePaciente(cc);
  }
}
