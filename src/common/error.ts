import { HttpException, HttpStatus } from '@nestjs/common';

export class AleadyExistError extends HttpException {
  constructor(message: string = '이미 존재합니다.') {
    super({ message, code: 'aleady_exist' }, HttpStatus.BAD_REQUEST);
  }
}

export class NotFoundError extends HttpException {
  constructor(message: string = '존재하지 않는 경로입니다.') {
    super({ message, code: 'not_found' }, HttpStatus.NOT_FOUND);
  }
}
