import ApolloClient from 'apollo-boost';

const prisma_endpoint: string = "https://eu1.prisma.sh/bankda/bankda-careda/dev";

const client = new ApolloClient({
    uri: prisma_endpoint,
});

export default client;