import express from "express";
import 'dotenv/config'
const app = express()
import cors from 'cors'
import morgan from "morgan";
import helmet from "helmet";

const PORT = process.env.PORT || 8000

// use middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())

// mongodb connect

// routers
app.get('/', (req, res) => {
    res.json({
        message: "You have reached the admin api",
    })
})

// error handling
app.use((err, req, res, next) => {
    res.json({
        status: 'error',
        message: err.message,
    })
})

// bind app with the port to serve on internet
app.listen(PORT, error => {
    error ? console.log(error) : console.log(`server is running on http://localhost:${PORT}`)
})