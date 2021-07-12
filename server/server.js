import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

// Routes 
import AuthRoutes from './routes/auth/AuthRoutes.js'
import PostRoutes from './routes/post/PostRoutes.js'

const app = express()
dotenv.config({ path: 'config/config.env'})

const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: true 
}

mongoose.connect(process.env.MONGODB_URL, options)
        .catch((error) => console.log(error))

mongoose.connection.on('error', () => {
    console.log('Post MongoDB connection Error')
})

mongoose.connection.once('open', () => {
    console.log('MongoDB is connected')
})

app.use(express.json({ limit: "30mb"}))
app.use(express.urlencoded({ limit: "30mb",extended: true }))
app.use(cors({ credentials: true, origin: true}))
app.use (cookieParser())
app.use(morgan('dev'))

app.use("/api/auth", AuthRoutes)
app.use("api/post", PostRoutes)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})

process.on('unhandledRejection', (error, promise) => {
    console.log(`Error Logged: ${error}`)
    server.close(process.exit(1))
})