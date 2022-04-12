import { buildSchema } from 'type-graphql';
import { AuthResolver } from './auth.resolver';

const schemaBuild = async () => {
  const schema = await buildSchema({
    resolvers: [AuthResolver],
    emitSchemaFile: true,
    validate: true,
  });

  return schema;
};

export default schemaBuild;
