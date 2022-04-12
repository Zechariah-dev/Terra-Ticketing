import { Field, ObjectType } from 'type-graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  user: User;
}
