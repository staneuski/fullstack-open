const typeDefs = `
  type Author {
    bookCount: Int!
    born: Int
    name: String!
    id: ID!
  }

  type Book {
    author: Author!
    genres: [String!]!
    published: Int!
    title: String!
    id: ID!
  }

  type User {
    favoriteGenre: String!
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    allAuthors: [Author!]!

    allBooks(author: String, genre: String): [Book!]!
    bookCount: Int!

    me: User
  }

  type Mutation {
    addBook(
      author: String!
      genres: [String!]!
      published: Int!
      title: String!
    ): Book!
    createUser(username: String!, favoriteGenre: String!): User
    editAuthor(name: String!, setBornTo: Int!): Author
    login(username: String!, password: String!): Token 
  }

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs
