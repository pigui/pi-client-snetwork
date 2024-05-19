import { provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom, makeEnvironmentProviders } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { Kind, OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';
import { InMemoryCache, split } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocket } from 'ws';

export function provideGraphql() {
  return makeEnvironmentProviders([
    provideHttpClient(withFetch()),
    importProvidersFrom(ApolloModule),
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        const ws = new GraphQLWsLink(
          createClient({
            webSocketImpl: WebSocket,
            url: 'http://localhost:3000/graphql',
          })
        );
        const http = httpLink.create({
          uri: 'http://localhost:3000/graphql',
        });

        const link = split(
          // Split based on operation type
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === Kind.OPERATION_DEFINITION &&
              definition.operation === OperationTypeNode.SUBSCRIPTION
            );
          },
          ws,
          http
        );

        return {
          cache: new InMemoryCache(),
          link,
        };
      },
      deps: [HttpLink],
    },
  ]);
}
