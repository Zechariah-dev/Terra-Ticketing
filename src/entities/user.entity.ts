import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Ticket } from './ticket.entity';

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
  contact: string;

  @Field()
  @Column({ nullable: true, default: false })
  verified: boolean;

  @OneToMany(() => Ticket, (ticket) => ticket.id)
  tickets: Ticket[];

  @Column('int', { default: 0 })
  token_version: number;
}
