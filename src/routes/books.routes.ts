import { Router } from 'express'
import {
  createBookController,
  deleteBookWithIdController,
  readBookController,
  readBookWithIdController,
  updateBookWithIdController
} from '~/controllers/book.controllers'
import { bookValidator } from '~/middlewares/books.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const booksRouter = Router()
/*
 * Description: create book
 * Path: /create
 * Method:POST
 * Body:{ 
      _id?: ObjectId
      title?: string
      author: string
      publication_date?: Date
      genre: string
      language?: Date
      publisher?: Date
      price?: string
      description?: string 
}
 */
booksRouter.post('/create', bookValidator, wrapRequestHandler(createBookController))
/*
 * Description: reads book
 * Path: /reads
 * Method:get
 *query:page,limit
}
 */
booksRouter.get('/reads', wrapRequestHandler(readBookController))
/*
 * Description: reads book with id
 * Path: /read/id
 * Method:get
 *
}
 */
booksRouter.get('/read/:id', wrapRequestHandler(readBookWithIdController))
/*
 * Description: update book with id
 * Path: /read/id
 * Method:put
}
 */
booksRouter.put('/update/:id', wrapRequestHandler(updateBookWithIdController))
/*
 * Description: delete book with id
 * Path: /read/id
 * Method:delete
}
 */
booksRouter.delete('/delete/:id', wrapRequestHandler(deleteBookWithIdController))

export default booksRouter
