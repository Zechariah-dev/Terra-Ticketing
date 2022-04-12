import { createEventDto } from '../dto/event.dto';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { Event } from '../entities/event.entity';

@Resolver((_of) => Event)
export class EventResolver {
  @Mutation(() => Event)
  async createEvent(@Arg('body') body: createEventDto) {
      
  }
}
