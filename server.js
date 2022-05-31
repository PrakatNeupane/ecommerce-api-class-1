import express from "express";
import 'dotenv/config'
const app = express()
import cors from 'cors'
import morgan from "morgan";
import helmet from "helmet";
import { dbConnect } from "./src/config/dbConfig.js";

const PORT = process.env.PORT || 8000

// use middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())

// mongodb connect
dbConnect()
// routers
import adminRouter from './src/routers/adminRouter.js'
app.use('/api/v1/admin', adminRouter)

app.get('/', (req, res) => {
    res.json({
        message: "You have reached the admin api",
    })
})


// error handling
app.use((err, req, res, next) => {
    // log in file system or time seriew db like cloudwatch
    res.status(err.status || 400)
    res.json({
        status: 'error',
        message: err.message,
    })
})

// bind app with the port to serve on internet
app.listen(PORT, error => {
    error ? console.log(error) : console.log(`server is running on http://localhost:${PORT}`)
})