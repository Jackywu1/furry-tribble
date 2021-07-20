/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

const gateway = new ApolloGateway({
  serviceList: [
    {
      name: 'spotify',
      // url: 'http://spotify:1337',
      url: 'http://127.0.0.1:1337',
    },
  ],
});

const buildServer = () => new ApolloServer({ gateway, subscriptions: false });

export default buildServer;
