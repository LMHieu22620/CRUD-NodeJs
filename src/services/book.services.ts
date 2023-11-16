import Book from '~/models/schemas/Books.schema'
import databaseService from './database.services'
import { CreateBookReqBody } from '~/models/request/Book.request'
import BOOKS_MESSAGE from '~/constants/message'
import { ObjectId } from 'mongodb'

class BookServices {
  async createBook(payload: CreateBookReqBody) {
    await databaseService.book.insertOne(
      new Book({
        ...payload,
        publication_date: new Date(payload.publication_date)
      })
    )
    return {
      mesage: BOOKS_MESSAGE.CREATE_SUCCESS
    }
  }
  async readBook(page: number, limit: number) {
    const result = await databaseService.book
      .find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()
    return result
  }
  async getBookIdStatus(id: string) {
    const data = await databaseService.book.findOne({ _id: new ObjectId(id) })
    return data
  }
  async updateBookIdStatus(id: string, payload: CreateBookReqBody) {
    const result = await databaseService.book.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...payload,
          title: payload.title,
          author: payload.author,
          description: payload.description,
          genre: payload.genre,
          language: payload.language,
          price: payload.price,
          publication_date: payload.publication_date,
          publisher: payload.publisher
        }
      }
    )

    return {
      result
    }
  }
  async deleteBookIdStatus(id: string) {
    const result = await databaseService.book.deleteOne({ _id: new ObjectId(id) })
    return {
      result
    }
  }
}

const bookServices = new BookServices()

export default bookServices
