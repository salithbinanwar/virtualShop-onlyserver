import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const port = process.env.PORT || 8080
connectDB()
const app = express()
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://192.168.1.100:3000',
      'http://192.168.56.1:3000/',
      'https://thevirtualshop.netlify.app',
    ],
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
//defining the routes
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  console.log(req.hostname)
  res.send('api is working')
})

//middleware
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`server started on ${port}`))
