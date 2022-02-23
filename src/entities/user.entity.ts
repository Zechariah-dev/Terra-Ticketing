import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import bcrypt from 'bcrypt';

@ObjectType()
@Entity('user')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field()
  @Column()
  company_name: string;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ nullable: true, default: false })
  verified: boolean;

  @Column('int', { default: 0 })
  token_version: number;
}
