import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express, { Application } from 'express';
import { createConnection } from 'typeorm';
import http from 'http';
import schemaBuild from './resolvers';

export async function startApolloServer() {
  const app: Application = express();
  const httpServer = http.createServer(app);

  const schema = await schemaBuild();

  const connection = createConnection();

  const server = new ApolloServer({
    schema: schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app, path: '/' });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );

  console.log(`🚀 Server ready at http://localhost:4000/${server.graphqlPath}`);
}
