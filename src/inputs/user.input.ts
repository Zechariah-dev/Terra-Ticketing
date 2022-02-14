import { Field, InputType } from 'type-graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class createUserInput  {
  @Field(() => String)
  @IsString()
  email: string;

  @Field(() => String)
  @IsString()
  @Length(4, 50)
  password: string;
}
