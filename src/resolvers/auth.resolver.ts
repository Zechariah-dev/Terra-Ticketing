import { ApolloError } from 'apollo-server-express';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { User } from '../entities/user.entity';
import { createUserDto, loginUserDto } from '../dto/user.dto';
import { LoginResponse } from '../types/user.type';
import { createAccessToken } from '../utils/auth';

@Resolver((_of) => User)
export class AuthResolver {
  @Query((_returns) => User)
  async getSingleUser(@Arg('id') id: number) {
    return User.findOne({ where: { id } });
  }

  @Mutation(() => User)
  async register(@Arg('body') body: createUserDto): Promise<User> {
    let { email, password, ...rest } = body;

    let user = await User.findOne({ where: { email } });

    if (user) {
      throw new ApolloError('Credientials already in use', '400');
    }

    const hashedPassword = await hash(password, 10);

    const payload = {
      email,
      password: hashedPassword,
      ...rest,
    };

    user = await User.create(payload);

    await user.save();
    return user;
  }

  @Mutation(() => LoginResponse)
  async login(@Arg('body') body: loginUserDto): Promise<LoginResponse> {
    const { email, password } = body;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      throw new ApolloError('could not find user');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new ApolloError('incorrect password');
    }

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }
}
