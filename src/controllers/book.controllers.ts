import { error } from 'console'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { validationResult } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import BOOKS_MESSAGE from '~/constants/message'
import { ErrorWithStatus } from '~/models/Error'
import { CreateBookReqBody } from '~/models/request/Book.request'
import Book from '~/models/schemas/Books.schema'
import bookServices from '~/services/book.services'
import databaseService from '~/services/database.services'

export const createBookController = async (
  req: Request<ParamsDictionary, any, CreateBookReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = bookServices.createBook(req.body)
  return res.json({
    mesage: BOOKS_MESSAGE.CREATE_SUCCESS
  })
}
export const readBookController = async (
  req: Request<ParamsDictionary, any, CreateBookReqBody>,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as any) || 1 // Trang mặc định là 1
  const limit = parseInt(req.query.limit as any) || 1000 // Số lượng bản ghi mỗi trang mặc định là 10
  const result = await bookServices.readBook(page, limit)
  return res.render('book/read', { data: result })
}

export const renderAddBookController = async (req: Request, res: Response, next: NextFunction) => {
  return res.render('book/add')
}

export const renderUpdateBookController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await bookServices.getBookIdStatus(id as string)

  if (!result) {
    throw new ErrorWithStatus({
      message: BOOKS_MESSAGE.BOOK_NOT_FOUND,
      status: HTTP_STATUS.NOT_FOUND
    })
  }

  return res.render('book/update', { data: result })
}

export const readBookWithIdController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  const result = await bookServices.getBookIdStatus(id as string)

  return res.json(result)
}

export const updateBookWithIdController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const book = await databaseService.book.findOne({ _id: new ObjectId(id) })
  if (!book) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: BOOKS_MESSAGE.BOOK_NOT_FOUND
    })
  }

  await bookServices.updateBookIdStatus(id as string, req.body)

  return res.json({
    message: BOOKS_MESSAGE.UPDATE_BOOK_WITH_ID_STATUS_SUCCESS
  })
}

export const deleteBookWithIdController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const book = await databaseService.book.findOne({ _id: new ObjectId(id) })
  if (!book) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: BOOKS_MESSAGE.BOOK_NOT_FOUND
    })
  }

  await bookServices.deleteBookIdStatus(id as string)

  return res.json({
    message: BOOKS_MESSAGE.DELETE_BOOK_WITH_ID_STATUS_SUCCESS
  })
}
