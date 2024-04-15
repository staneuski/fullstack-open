import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      bookCount
      born
      name
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      published
      title
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook(
    $author: String!
    $genres: [String!]!
    $published: Int!
    $title: String!
  ) {
    addBook(
      author: $author
      genres: $genres
      published: $published
      title: $title
    ) {
      author
      genres
      published
      title
    }
  }
`
