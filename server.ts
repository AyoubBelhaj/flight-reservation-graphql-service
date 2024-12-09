const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./graphql/typeDefs");
const { resolvers } = require("./graphql/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4000, () => {
    console.log('GraphQl API running on http://localhost:4000');
})

