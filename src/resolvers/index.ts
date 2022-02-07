import { buildSchema } from 'type-graphql';
import { UserResolver } from './user.resolver';

const schemaBuild = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
    validate: true,
  });

  return schema;
};

export default schemaBuild;
