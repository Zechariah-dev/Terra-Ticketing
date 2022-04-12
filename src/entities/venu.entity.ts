import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

enum VenueStatus {
  ACTIVE = 'active',
  UNDERRENOVATION = 'under renovation',
  INACTIVE = 'inactive',
}
@ObjectType()
@Entity('venue')
export class Venue extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({
    type: 'enum',
    enum: VenueStatus,
    default: VenueStatus.ACTIVE,
  })
  status: VenueStatus;

  @Field()
  @Column()
  slug: string;

  @Field()
  @Column()
  timezone: string;

  // @Field()
  // @Column('simple-json')
  // tzinfo: {
  //   name: string;
  //   identifier: string;
  //   offset: number;
  //   formatted_offset: string;
  // };

  // @Field()
  // @Column('simple-json')
  // address: {
  //   address1: string;
  //   city: string;
  //   zipcode: string;
  //   state_name: string;
  //   state_code: string;
  //   country_name: string;
  //   country_code: string;
  // };

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
