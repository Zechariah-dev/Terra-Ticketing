import { Field, InputType } from 'type-graphql';
import { User } from '../entities/user.entity';
import { IsString, Length } from 'class-validator';

@InputType()
export class createUserInput implements Omit<User, 'id'> {
  @Field(() => String)
  @IsString()
  email: string;

  @Field(() => String)
  @IsString()
  @Length(4, 50)
  password: string;
}
