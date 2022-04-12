import { TicketTypes } from '../types/ticket.type';
import { Field, ObjectType } from 'type-graphql';
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

@ObjectType()
@Entity('tickettype')
export class TicketType extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Event)
  @JoinColumn()
  event_id: Event;

  @Field()
  @Column({
    type: 'enum',
    enum: TicketTypes,
    default: TicketTypes.REGULAR,
  })
  type: TicketTypes;

  @Field()
  @Column({ nullable: true, default: null })
  quantity: number;

  @Field()
  @Column({
    length: 3,
  })
  curreny: string;

  @Field()
  @Column('float')
  price: number;

  @Field()
  @Column({ nullable: true, default: false })
  transferable: boolean;

  @Field()
  @Column({ nullable: true, default: false })
  require_name: boolean;

  @Field()
  @Column({ nullable: true, default: false })
  require_email: boolean;

  @Field()
  @Column({ nullable: true, default: false })
  include_name: boolean;

  @Field()
  @Column({ nullable: true, default: false })
  include_email: boolean;

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
