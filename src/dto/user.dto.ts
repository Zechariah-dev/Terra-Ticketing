import { Field, InputType } from 'type-graphql';
import { IsString, Length, IsEmail } from 'class-validator';

@InputType()
export class createUserDto {
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

  @Field()
  @IsString()
  contact: string;

  @Field()
  @IsString()
  @Length(4, 50)
  password: string;
}

@InputType()
export class loginUserDto {
  @Field()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}
