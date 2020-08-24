'use strict'

require('dotenv').config()

const config = {
    port: process.env.PORT || 3000,
    twitterToken: process.env.TWITTER_TOKEN
}

module.exports = { config }