import { Field, InputType } from 'type-graphql';
import { IsString, Length, IsEmail } from 'class-validator';

@InputType()
export class createEventDto {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  status: string;

  @Field()
  @IsString()
  @IsEmail()
  start: string;

  @Field()
  @IsString()
  end: string;
}
