import { config } from 'dotenv'
import { Collection, Db, MongoClient } from 'mongodb'
import Book from '~/models/schemas/Books.schema'
config()
const uri = `mongodb+srv://minhhieu207819:hieu123@crud.a6synfl.mongodb.net/`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db('CRUD')
  }

  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }
  get book(): Collection<Book> {
    return this.db.collection(process.env.DB_BOOKS_COLLECTION as string)
  }
}

// Tạo obj từ class DatabaseService
const databaseService = new DatabaseService()

export default databaseService
