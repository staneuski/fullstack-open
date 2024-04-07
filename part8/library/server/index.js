const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

let authors = [
  {
    born: 1952,
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e'
  },
  {
    born: 1963,
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e'
  },
  {
    born: 1821,
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e'
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e'
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e'
  }
]

/**
 * It might make more sense to associate a book with its author by storing the
 * author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection
 * with the book.
 */
let books = [
  {
    author: 'Robert Martin',
    genres: ['refactoring'],
    published: 2008,
    title: 'Clean Code',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e'
  },
  {
    author: 'Robert Martin',
    genres: ['agile', 'patterns', 'design'],
    published: 2002,
    title: 'Agile software development',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e'
  },
  {
    author: 'Martin Fowler',
    genres: ['refactoring'],
    published: 2018,
    title: 'Refactoring, edition 2',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e'
  },
  {
    author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns'],
    published: 2008,
    title: 'Refactoring to patterns',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e'
  },
  {
    author: 'Sandi Metz',
    genres: ['refactoring', 'design'],
    published: 2012,
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e'
  },
  {
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'crime'],
    published: 1866,
    title: 'Crime and punishment',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e'
  },
  {
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution'],
    published: 1872,
    title: 'The Demon',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e'
  }
]

const typeDefs = `
  type Author {
    bookCount: Int!
    born: Int
    name: String!
    id: ID!
  }

  type Book {
    author: String!
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
    ): Book
  }
`

const resolvers = {
  Query: {
    allAuthors: () => authors,
    allBooks: (root, args) => {
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
    },
    authorCount: () => authors.length,
    bookCount: () => books.length
  },
  Author: {
    bookCount: (root) =>
      books.filter((book) => book.author === root.name).length
  },
  Mutation: {
    addBook: (root, args) => {
      if (!authors.find((author) => author.name === args.author)) {
        authors = authors.concat({
          id: uuid(),
          name: args.author
        })
      }

      const book = { ...args, id: uuid() }
      books = books.concat(book)
      return book
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
