import { config } from 'dotenv'
import { Collection, Db, MongoClient } from 'mongodb'
import Book from '~/models/schemas/Books.schema'
config()

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_CONNECT_URI as string)
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
    return this.db.collection('book' as string)
  }
}

// Tạo obj từ class DatabaseService
const databaseService = new DatabaseService()

export default databaseService
