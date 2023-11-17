import { defaulErrorHandler } from './middlewares/error.middlewares'
import booksRouter from './routes/books.routes'
import databaseService from './services/database.services'
import path from 'path'
import express from 'express'
import cors from 'cors'
import moment from 'moment'
import _ from 'lodash'
moment.locale('vi')

// const fullname: string = 'minh hiếu'
databaseService.connect()
const app = express()
const port = 3001
app.locals.moment = moment
app.locals._ = _

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(cors())
app.use('/books', booksRouter)
app.use(defaulErrorHandler)
app.listen(process.env.PORT || port, () => {
  console.log(`port${port}`)
})
