import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User } from '../entities/user.entity';
import { createUserInput } from '../inputs/user.input';

@Resolver((_of) => User)
export class UserResolver {
  @Query((_returns) => User)
  async getSingleUser(@Arg('id') id: number) {
    return User.findOne({ where: { id } });
  }

  @Mutation(() => User)
  async createUser(
    @Arg('body') { email, password }: createUserInput,
  ): Promise<User> {
    const user = User.create({ email, password });
    await user.save();
    return user;
  }
}
