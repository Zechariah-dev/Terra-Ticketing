import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express, { Application } from 'express';
import { createConnection } from 'typeorm';
import http from 'http';
import cors from 'cors';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import session from 'express-session';
import connectRedis from 'connect-redis';

import schemaBuild from './resolvers';
import { redis } from './redis';

const RedisStore = connectRedis(session as any);

export async function startApolloServer() {
  const app: Application = express();
  const httpServer = http.createServer(app);

  if (process.env.NODE_ENV === 'test') {
    await redis.flushall();
  }

  app.use(
    cors({
      origin: 'http://localhost:4000',
      credentials: true,
    }),
  );

  const schema = await schemaBuild();

  const pubsub = new RedisPubSub(
    process.env.NODE_ENV === 'production'
      ? {
          connection: process.env.REDIS_URL as any,
        }
      : {},
  );

  await createConnection();

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: 'qid',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    } as any),
  );

  const server = new ApolloServer({
    schema: schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }) => ({ req, res }),
  });

  await server.start();
  server.applyMiddleware({ app, path: '/' });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );

  console.log(`🚀 Server ready at http://localhost:4000/${server.graphqlPath}`);
}
