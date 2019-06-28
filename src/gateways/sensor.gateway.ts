import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { TarjetaService } from '../services/tarjeta/tarjeta.service';
import { Client, Server } from 'socket.io';

@WebSocketGateway()
export class SensorGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() // Creamos socket server para emitir eventos
  server: Server;

  constructor(private tarjetaService: TarjetaService) {
  }

  @SubscribeMessage('tarjeta') // Escuchamos el evento tarjeta que es emitido por el arduino cuando detecta una tarjeta
  async handleMessage(client: any, codigoT: any) { // sacamos la informacion del cliente y el codigo
    console.log('tarjeta: ', codigoT);
    const tarjeta = await this.tarjetaService.getTarjetaRFID(codigoT).then(value => { // obtenemos la informacion de la tarjeta
      this.salidaP(value);
    });

  }

  // salidaP(tarjeta) { // emitimos el paciente que salio
  //   this.server.emit('salio', tarjeta);
  // }

  async salidaP(value) { // emitimos el paciente que salio
    this.server.emit('salio', value);
  }

  handleConnection(client: Client, ...args: any[]): any { // cuando alguien se conecta
    console.log(`Se conecto el cliente ${client.id}`);
  }

  handleDisconnect(client: Client): any { // cuando alguien se deconecta
    console.log(`Se desconecto el cliente ${client.id}`);
  }

}
