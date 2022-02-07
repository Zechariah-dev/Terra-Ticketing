import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User } from '../entities/user.entity';
import { createUserInput } from '../inputs/user.input';

@Resolver((_of) => User)
export class UserResolver {
  @Query((_returns) => User)
  async getSingleUser() {
    return {
      id: 1,
      email: 'omolade@gmail.com',
      password: 'ssss',
    };
  }

  @Mutation(() => User)
  async createUser(
    @Arg('body') { email, password }: createUserInput,
  ): Promise<User> {
    const user: User = { id: 1, email, password };

    return user;
  }
}
