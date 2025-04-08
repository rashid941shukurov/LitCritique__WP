require('dotenv').config()

const express = require('express')
const app = express()

const router = require('./routes/routes')
const path = require('path')
const cors = require('cors')


app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use('/', router)



const mongoose = require('mongoose')

mongoose
        .connect(process.env.MONGODB_URI)
        .then(()=> console.log('Connected to mongoDB'))
        .catch((err)=> console.log(err))


app.listen(process.env.PORT)