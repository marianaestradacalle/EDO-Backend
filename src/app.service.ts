import { Injectable } from '@nestjs/common';
// import { ConfigService } from './config/config-service';

@Injectable()
export class AppService {
  private isAuthEnabled: boolean;
  //
  // constructor(config: ConfigService) {
  //   // Please take note that this check is case sensitive!
  //   if (config.isApiAuthEnabled) {
  //     console.log('es valido');
  //   }
  // }

  getHello(): string {
    return 'Hello World!';
  }
}
