import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PacienteService } from './services/paciente/paciente.service';
import { PacienteSchema } from './models/paciente.model';
import { EncargadoSchema } from './models/encargado.model';
import { TarjetaSchema } from './models/tarjeta.model';
import { EncargadoController } from './controllers/encargado/encargado.controller';
import { PacienteController } from './controllers/paciente/paciente.controller';
import { TarjetaController } from './controllers/tarjeta/tarjeta.controller';
import { AlertaController } from './controllers/alerta/alerta.controller';
import { TarjetaService } from './services/tarjeta/tarjeta.service';
import { EncargadoService } from './services/encargado/encargado.service';
import { SensorGateway } from './gateways/sensor.gateway';
import { AlertService } from './services/alert/alert.service';

const URLDB = process.env.urlDB || 'mongodb://localhost:27017/edo';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot('mongodb://localhost:27017/edo', { useNewUrlParser: true }),
    // MongooseModule.forRoot('mongodb+srv://admin:1193120855@cluster0-xjwrt.mongodb.net/edo?retryWrites=true', { useNewUrlParser: true }),
    MongooseModule.forFeature([
      { name: 'Paciente', schema: PacienteSchema },
      { name: 'Encargado', schema: EncargadoSchema },
      { name: 'Tarjeta', schema: TarjetaSchema },
    ]),
  ],
  controllers: [AppController, EncargadoController, PacienteController, EncargadoController, TarjetaController, AlertaController],
  providers: [AppService, PacienteService, TarjetaService, EncargadoService, SensorGateway, AlertService ],
})
export class AppModule {
}
