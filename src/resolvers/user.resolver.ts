import { ApolloError } from 'apollo-server-express';
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
} from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { User } from '../entities/user.entity';
import { createUserDto, loginUserDto } from '../dto/user.dto';
import { createAccessToken } from '../utils/auth';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  user: User;
}

@Resolver((_of) => User)
export class UserResolver {
  @Query((_returns) => User)
  async getSingleUser(@Arg('id') id: number) {
    return User.findOne({ where: { id } });
  }

  @Mutation(() => User)
  async register(@Arg('body') body: createUserDto): Promise<User> {
    let { company_name, email, password, firstname, lastname } = body;

    let user;
    let payload;

    if (company_name.length > 0) {
      user = await User.findOne({
        where: [{ company_name }, { email }],
      });
    }

    if (user) {
      throw new ApolloError(
        'A representative for your company already exists. Please kindly contact',
        '400',
      );
    }

    const hashedPassword = await hash(password, 10);

    payload = {
      company_name,
      email,
      firstname,
      lastname,
      password: hashedPassword,
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
