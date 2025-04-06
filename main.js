const express = require('express')
const app = express()
const router = require('./routes/routes')
const path = require('path')
const cors = require('cors')


app.use('/', router)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(express.json()) 
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())





app.listen(process.env.PORT || 4200)