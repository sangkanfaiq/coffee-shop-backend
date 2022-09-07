const express = require('express')
const app  = express()


const productsRoute = require('./productsRoute')
const authRoute = require('./authRoute')
const categoriesRoute = require('./categoriesRoute')

app.use('/products', productsRoute)
app.use('/auth', authRoute)
app.use('/categories', categoriesRoute)


module.exports = app