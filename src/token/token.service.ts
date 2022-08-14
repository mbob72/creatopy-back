import { Injectable } from '@nestjs/common';
import { CreateTokenInput } from './dto/create-token.input';

@Injectable()
export class TokenService {
  async create(createTokenInput: CreateTokenInput) {
    // const user = await this.checkUserCredentials(email, password);

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
