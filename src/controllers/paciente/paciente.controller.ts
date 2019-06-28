import { PacienteService } from './../../services/paciente/paciente.service';
import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';

@Controller('paciente')
export class PacienteController {

  constructor(private pacienteService: PacienteService) {
  }

  @Post()
  agregarPaciente(@Body() body) {
    console.log(body);
    return this.pacienteService.addPaciente(body, body.encargado);
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

  @Put('/familiar')
  addFamiliar(@Body() body) {
    const id = body.id;
    const familiar = body.familiar;
    return this.pacienteService.addFamiliar(id, familiar);
  }

  @Delete(':cc')
  eliminarPaciente(@Param('cc') cc) {
    return this.pacienteService.deletePaciente(cc);
  }
}
