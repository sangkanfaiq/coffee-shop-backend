const express = require('express')
const app  = express()


const productsRoute = require('./productsRoute')

app.use('/products', productsRoute)


module.exports = app