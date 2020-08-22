'use strict'

const express = require('express')
const { config } = require('./config/index')
const debug = require('debug')("app:server")
const app = express()

app.get('/', (req, res) => {
    res.send('Probando la conexión del servidor')
})

const server = app.listen(config.port, (req, res) => {
    debug(`Server is listening at http://localhost:${config.port}`)
})