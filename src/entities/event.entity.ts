import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { EventStatus } from '../types/event.type';
import { TicketType } from './ticket-type.entity';
import { User } from './user.entity';

@ObjectType()
@Entity('event')
export class Event extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.FUTURE,
  })
  status: EventStatus;

  @Field()
  @Column()
  slug: string;

  @Field()
  @Column()
  start: Date;

  @Field()
  @Column()
  end: Date;

  @OneToMany(() => TicketType, (ticket_type) => ticket_type.id)
  ticket_types: TicketType[];

  @OneToOne(() => User)
  @JoinColumn()
  created_by: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
