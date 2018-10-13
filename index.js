const { ApolloServer, gql } = require('apollo-server');


// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    id: 1,
    title: 'Harry Potter and the Philosophers Stone',
    authorId: 2
  },
  {
    id: 2,
    title: 'Harry Potter and the Chamber of Secrets',
    authorId: 2
  },
  {
    id: 3,
    title: 'Harry Potter and the Prisoner of Azkaban',
    authorId: 2
  },
  {
    id: 4,
    title: 'Harry Potter and the Goblet of Fire',
    authorId: 2
  },
  {
    id: 5,
    title: 'Harry Potter and the Order of the Phoenix',
    authorId: 2
  },
  {
    id: 6,
    title: 'Harry Potter and the Half Blood Prince',
    authorId: 2
  },
  {
    id: 7,
    title: 'Harry Potter and the Deathly Hallows',
    authorId: 2
  },
  {
    id: 8,
    title: 'Jurassic Park',
    authorId: 3
  },
  {
    id: 9,
    title: 'Angels and Demons',
    authorId: 1
  },
  {
    id: 10,
    title: 'The DaVinci Code',
    authorId: 1
  },
  {
    id: 11,
    title: 'The Manchurian Candidate',
    authorId: 5
  },
  {
    id: 12,
    title: 'The Bourne Identity',
    authorId: 5
  },
  {
    id: 13,
    title: 'The Bourne Supremacy',
    authorId: 5
  },
  {
    id: 14,
    title: 'The Hobbit',
    authorId: 4
  },
  {
    id: 15,
    title: 'The Fellowship of the Ring',
    authorId: 4
  },
  {
    id: 16,
    title: 'The Two Towers',
    authorId: 4
  }, 
  {
    id: 17,
    title: 'The Return of the King',
    authorId: 4
  }
];

const authors = [
    {id: 1, firstname: "Dean", lastname:"Brown" },
    {id: 2, firstname: "J.K.", lastname:"Rowling" },
    {id: 3, firstname: "Michael", lastname:"Crichton" },
    {id: 4, firstname: "J.R.R.", lastname:"Tolkein" },
    {id: 5, firstname: "Robert", lastname:"Ludlum"}
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    id: Int!
    title: String!
    author: Author!
  }

  type Author
  {
     id: Int!,
     firstname: String!,
     lastname: String!,

     books: [Book]
  }
    

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book],
    authorsBooks(lastname: String): [Book]
  }

`;

var find = require('lodash/find');
var filter = require('lodash/filter');

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    authorsBooks: (_, {lastname}) => find(authors, {lastname})
  },

  Author: {
    books: author => filter(books, { authorId: author.id }),
  },
  
  Book: {
    author: book => find(authors, { id: book.authorId }),
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


//const { RESTDataSource } = require('apollo-datasource-rest');

//const api_key = '?api_key=17cefb589faeaf030d730aa855c711d0';


//class MoviesAPI extends RESTDataSource {
//  constructor() {
//    super();
//    this.baseURL = 'https://api.themoviedb.org/3/';
//  }

//  async getMovie(id) {
//    return this.get(`movie/${id}`);
//  }

//}