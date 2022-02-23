import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express, { Application } from 'express';
import { createConnection } from 'typeorm';
import http from 'http';
import cors from 'cors';
import schemaBuild from './resolvers';

export async function startApolloServer() {
  const app: Application = express();
  const httpServer = http.createServer(app);

  app.disable('x-powered-by');

  app.use(
    cors({
      origin: 'http://localhost:4000',
      credentials: true,
    }),
  );

  const schema = await schemaBuild();

  await createConnection();

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
