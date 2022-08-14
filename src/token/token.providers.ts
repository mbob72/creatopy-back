import { TOKEN_PROVIDER } from './token.constants';
import { Token } from './entities/token.entity';

export const tokenProviders = [
  {
    provide: TOKEN_PROVIDER,
    useValue: Token,
  },
];
