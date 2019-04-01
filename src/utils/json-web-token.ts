import * as jwt from 'jsonwebtoken';
import { HttpException, HttpStatus } from '@nestjs/common';

export class JsonWebToken {
 static async verify(token: string): Promise<string> {
   return jwt.verify(token, process.env.SEED, (err, decoded) => {
      if (err) {
        throw new HttpException({
          status: HttpStatus.UNAUTHORIZED,
          error: 'Token no válido',
        }, 401);
      }
      return decoded.user;
    });
  }
}
