const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const config = require('./utils/config')

console.log('connecting to', config.MONGODB_URI)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

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

  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    bookCount: Int!
  }

  type Mutation {
    addBook(
      author: String!
      genres: [String!]!
      published: Int!
      title: String!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    allAuthors: async () => Author.find({}),
    /*allBooks: (root, args) => {
      if (args.author && args.genre)
        return books.filter(
          (book) =>
            book.author === args.author && book.genres.includes(args.genre)
        )
      if (args.author)
        return books.filter((book) => book.author === args.author)
      if (args.genre)
        return books.filter((book) => book.genres.includes(args.genre))

      return books
    },*/
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments()
  },
  /*Author: {
    bookCount: (root) =>
      books.filter((book) => book.author === root.name).length
  },*/
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }

      const book = new Book({ ...args, author: author.id })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      return book
    }
    /*
    editAuthor: (root, args) => {
      const author = authors.find((p) => p.name === args.name)
      if (!author) return null

      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author
      )
      return updatedAuthor
    }*/
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`server ready at ${url}`)
})
