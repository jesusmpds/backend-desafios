const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const allTypes = require("./types/product"); // All Exported Types
const allQueries = require("./queries/allQueries"); // All Exported Queries
const allMutation = require("./mutations/allMutations"); // All Exported Mutations
const resolvers = require("./resolvers/index"); // All Exported Resolvers

// this will build all the schema
const schema = buildSchema(`${allQueries} ${allMutation} ${allTypes}`);

// graphQl method
const express_graphiql = (req, res) => {
  return graphqlHTTP({
    schema: schema, // Build schema
    rootValue: resolvers, // Resolvers
    graphiql: true,
  })(req, res);
};

module.exports = express_graphiql;
