import { ObjectId } from 'mongodb'

interface BookType {
  _id?: ObjectId
  title?: string
  author: string
  publication_date?: Date
  genre: string
  language?: string
  publisher?: string
  price?: string
  description?: string
}

export default class Book {
  _id?: ObjectId
  title?: string
  author?: string
  publication_date?: Date
  genre?: string
  language: string
  publisher?: string
  price?: string
  description?: string
  constructor(book: BookType) {
    const date = new Date()
    this._id = book._id
    this.title = book.title || ''
    this.author = book.author || ''
    this.publication_date = book.publication_date || date
    this.genre = book.genre || ''
    this.language = book.language || ''
    this.publisher = book.publisher || ''
    this.price = book.price || ''
    this.description = book.description || ''
  }
}
