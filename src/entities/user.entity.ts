import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('user')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  password: string;
}
