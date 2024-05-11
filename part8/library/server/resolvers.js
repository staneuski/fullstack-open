const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')

const config = require('./utils/config')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    //: Author {{{
    allAuthors: async () => Author.find({}).populate('books'),
    authorCount: async () => Author.collection.countDocuments(),
    //: }}}

    //: Book {{{
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
    bookCount: async () => Book.collection.countDocuments(),
    //: }}}

    //: User {{{
    me: (root, args, { currentUser }) => {
      return currentUser
    }
    //: }}}
  },
  Author: {
    bookCount: async (root) => root.books.length
  },
  Mutation: {
    //: Author {{{
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
    //: }}}

    //: Book {{{
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
      }

      const book = new Book({ ...args, author })
      try {
        author.books.push(book._id)
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

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    //: }}}

    //: User {{{
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
    //: }}}
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers
