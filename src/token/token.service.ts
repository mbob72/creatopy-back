import { Injectable } from '@nestjs/common';
import { CreateTokenInput } from './dto/create-token.input';

@Injectable()
export class TokenService {
  create(createTokenInput: CreateTokenInput) {
    return 'This action adds a new token';
  }

  findAll() {
    return `This action returns all token`;
  }

  findOne(token: string) {
    return `This action returns a #${token} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
