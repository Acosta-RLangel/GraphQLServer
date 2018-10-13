// schema.js
import Author from './author.js';

const RootQuery = `
  type RootQuery {
    author(id: Int!): Author
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, Author],
  resolvers: {},
});
