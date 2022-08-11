import { USER_PROVIDER } from './users.constants';
import { User } from './entities/user.entity';

export const usersProviders = [
  {
    provide: USER_PROVIDER,
    useValue: User,
  },
];
