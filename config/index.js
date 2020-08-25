'use strict'

require('dotenv').config()

const config = {
    dev: process.env.NODE_ENV !== 'production',
    devNode: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    twitterToken: process.env.TWITTER_TOKEN
}

module.exports = { config }