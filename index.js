'use strict'

const express = require('express')
const { config } = require('./config/index')
const debug = require('debug')("app:server")
const handlebars = require('express-handlebars')
const routeHome = require('./routes/home')
const routeResults = require('./routes/results')
const routeRedisData = require('./routes/redisData')
const routeTwitter = require('./routes/twitter')
const app = express()


// Body parser

// View Engine Setup
app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars({
    layoutsDir: `${__dirname}/views/layouts/`,
    partialsDir: `${__dirname}/views/partials/`,
    extname: 'hbs',
    defaultLayout: 'index'
}))

// Connection static files
app.use(express.static('public'))


// Routes
app.get('/', function(req, res){
    res.redirect('/home')
})

app.use('/home', routeHome)
app.use('/results', routeResults)
app.use('/redisData', routeRedisData)
app.use('/twitter', routeTwitter)


const server = app.listen(config.port, (req, res) => {
    debug(`Server is listening at http://localhost:${config.port}`)
})