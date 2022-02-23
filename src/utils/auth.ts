import { sign } from 'jsonwebtoken';
import { User } from '../entities/user.entity';

export const createAccessToken = (user: User) => {
  return sign(
    {
      userId: user.id,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: '15m',
    },
  );
};

export const createRefreshToken = (user: User) => {
  return sign(
    {
      userId: user.id,
      token_version: user.token_version,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    },
  );
};
