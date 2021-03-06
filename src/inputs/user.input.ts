import { Field, InputType } from 'type-graphql';
import { IsString, Length, IsEmail } from 'class-validator';

@InputType()
export class createUserInput {
  @Field()
  @IsString()
  firstname: string;

  @Field()
  @IsString()
  lastname: string;

  @Field()
  @IsString()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsString()
  company_name: string;

  @Field()
  @IsString()
  @Length(4, 50)
  password: string;
}

@InputType()
export class loginUserInput {
  @Field()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}
