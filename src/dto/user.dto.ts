import { Field, InputType, ObjectType } from 'type-graphql';
import { IsString, Length, IsEmail } from 'class-validator';
import { User } from '../entities/user.entity';

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

  @Field({ nullable: true })
  @IsString()
  company_name: string;

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
