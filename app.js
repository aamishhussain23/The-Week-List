const express = require('express')
const allRoutes = require('./routes/user')
const {config} = require('dotenv')
const app = express()

config({
    path : './config/config.env'
})

app.use(express.json())
app.use('/api/v1', allRoutes)

module.exports = app