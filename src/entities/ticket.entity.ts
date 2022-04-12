import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { User } from './user.entity';
import { TicketStatus } from '../types/ticket.type';

@ObjectType()
@Entity('ticket')
export class Ticket extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.ACTIVE,
  })
  status: TicketStatus;

  @Field()
  @Column()
  note: string;

  @OneToOne(() => Event)
  @JoinColumn()
  event: Event;

  @Field()
  @Column()
  dispatched_at: Date;

  @Field()
  @Column()
  downloaded_at: Date;

  @Field()
  @Column()
  checkin_at: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

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
