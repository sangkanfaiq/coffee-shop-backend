const express = require('express')
const app  = express()


const productsRoute = require('./productsRoute')
const authRoute = require('./authRoute')

app.use('/products', productsRoute)
app.use('/auth', authRoute)


module.exports = app