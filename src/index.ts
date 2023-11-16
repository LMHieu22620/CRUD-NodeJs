import { defaulErrorHandler } from './middlewares/error.middlewares'
import booksRouter from './routes/books.routes'
import databaseService from './services/database.services'
import express from 'express'
import cors from 'cors'
// const fullname: string = 'minh hiếu'
databaseService.connect()

const app = express()
const port = 3001
app.use(express.json())
app.use(cors())

app.use('/books', booksRouter)
app.use(defaulErrorHandler)
app.listen(process.env.PORT || port, () => {
  console.log(`port${port}`)
})
