import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

// Routes
import AuthRoutes from './routes/auth/AuthRoutes.js'
import PostRoutes from './routes/post/PostRoutes.js'

// init server
const app = express()
dotenv.config({ path: './config/config.env'})

// Connect MongoDB database
const options = { 
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
}

mongoose.connect(process.env.MONGODB_URL, options)
        .catch((error) => console.log('MongoDB Initial Database connection ', error))

mongoose.connection.on('error', (error) => {
    console.log(`Post MongoDB connection: ${error}`)
})

mongoose.connection.once('open', () => {
    console.log('MongoDB is connected')
})

// Middleware
app.use(express.json({ limit: '30mb', type: 'application/json', strict: true }))
app.use(express.urlencoded({ extended: true, limit: '30mb', type: 'application/x-www-form-urlencoded'}))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({ origin: true, credentials: true }))

// Routes middleware
app.use('/api/auth', AuthRoutes)
app.use('/api/posts', PostRoutes)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})

process.on('unhandledRejection', (error, promise) => {
    console.log(`Error logged: ${error}`)
    server.close(process.exit(1))
})