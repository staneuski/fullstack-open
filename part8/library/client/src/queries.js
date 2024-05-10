import { gql } from '@apollo/client'

//: Book {{{
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    author {
      name
    }
    genres
    published
    title
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
//: }}}

//: Author {{{
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      bookCount
      born
      name
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`
//: }}}

//: User {{{
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const USER = gql`
  query {
    me {
      favoriteGenre
      username
    }
  }
`
//: }}}
