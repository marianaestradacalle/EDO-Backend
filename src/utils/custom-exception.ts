import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException {

  static internalError(error): HttpException {
    return new HttpException({
      error,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  static noResults(message: string): HttpException {
    return new HttpException({
      error: message,
    }, HttpStatus.BAD_REQUEST);
  }

  static clientError(message): HttpException {
    return new HttpException({
      error: message,
    }, HttpStatus.BAD_REQUEST);
  }

}
