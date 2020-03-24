import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-boost';

const prisma_endpoint: string = "https://eu1.prisma.sh/bankda/bankda-careda/dev";   // graphql - query endpoint
const prisma_ws_endpoint: string = "wss://eu1.prisma.sh/bankda/bankda-careda/dev";  // graphql - webscoket endpoint

const cache = new InMemoryCache();

const wsLink = new WebSocketLink({
    uri: prisma_ws_endpoint,
    options: {
        reconnect: true
    }
});

const httpLink = new HttpLink({
    uri: prisma_endpoint
});

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link,
    cache
});

export default client;