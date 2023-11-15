import { defaulErrorHandler } from './middlewares/error.middlewares'
import booksRouter from './routes/books.routes'
import databaseService from './services/database.services'
import express from 'express'

// const fullname: string = 'minh hiếu'
databaseService.connect()
const app = express()
const port = 3001
app.use(express.json())
app.use('/books', booksRouter)
app.use(defaulErrorHandler)
app.listen(port, () => {
  console.log(`port${port}`)
})
