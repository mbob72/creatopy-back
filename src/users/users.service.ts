import { Inject, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { BCRYPT_HASH_ROUNDS, USER_PROVIDER } from './users.constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_PROVIDER)
    private user: typeof User,
  ) {}

  async create({ fullName, login, password }: CreateUserInput) {
    await this.user.create({
      login: login,
      fullName: fullName,
      password: await this.hashPassword(password),
    });
    const user = await this.user.findOne({ where: { login } });
    return user.toJSON();
  }

  async findOne(id: number) {
    return (await this.user.findOne({ where: { id } })).toJSON();
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const oldUserData = await this.user.findOne({ where: { id } });
    const user = { ...oldUserData.toJSON(), updateUserInput };
    await this.user.update(user, { where: { id } });
    return user;
  }

  async remove(id: number) {
    const oldUserData = await this.user.findOne({ where: { id } });
    await this.user.destroy({ where: { id } });
    return oldUserData.toJSON();
  }

  hashPassword(password: string) {
    return hash(password, BCRYPT_HASH_ROUNDS);
  }
}
