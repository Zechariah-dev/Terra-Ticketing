import {
  isDefined,
  isJSON,
  IsNotEmptyObject,
  IsObject,
  isObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class createVenueDto {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  timezone: string;

  @Field()
  tzinfo: {
    name: string;
    identifier: string;
    offset: number;
    formatted_offset: string;
  };

  @Field()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  address: {
    address1: string;
    city: string;
    zipcode: string;
    state_name: string;
    state_code: string;
    country_name: string;
    country_code: string;
  };
}
