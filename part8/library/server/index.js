const { ApolloServer } = require('@apollo/server')
const { GraphQLError } = require('graphql')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
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

  type User {
    favoriteGenre: String!
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
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
`

const resolvers = {
  Query: {
    allAuthors: async () => Author.find({}),
    allBooks: async (root, { author, genre }) => {
      const filter = []
      if (author) {
        const authorObject = await Author.findOne({ name: author })
        if (!authorObject)
          throw new GraphQLError(`author='${author}' not found`, {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        filter.push({ author: { $in: authorObject.id } })
      }
      if (genre) {
        filter.push({ genres: { $in: genre } })
      }
      return await Book.find(filter.length ? { $and: filter } : {}).populate(
        'author'
      )
    },
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    me: (root, args, { currentUser }) => {
      return currentUser
    }
  },
  Author: {
    bookCount: async (root) =>
      await Book.find({ author: root.id }).countDocuments()
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }

      const book = new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      return book
    },
    editAuthor: async (root, { name, setBornTo }, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        return await Author.findOneAndUpdate(
          { name: name },
          { born: setBornTo },
          { new: true }
        )
      } catch (error) {
        throw new GraphQLError('editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: { name, setBornTo },
            error
          }
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User(args)
      return user.save().catch((error) => {
        throw new GraphQLError('creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = { username: user.username, id: user._id }
      return { value: jwt.sign(userForToken, config.SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'prod'
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`server ready at ${url}`)
})
