'use strict'

const express = require('express')
const router = express.Router()
const { config } = require('../config/index')
const request = require('request')

router.get('/', (req, res, next) => {
    let keyword = req.query.keyword
    keyword = keyword.toLocaleLowerCase().trim().replace(/\s+/g, '%20')
    console.log(keyword)
    const options = {
        method: 'GET',
        url: `https://api.twitter.com/1.1/search/tweets.json?q=${keyword}&count=50`,
        headers: {
            'Authorization': `Bearer ${config.twitterToken}`
        }
    }
    request(options, (error, response, body) => {
        if(error) throw new Error(error)
        let data = JSON.parse(body)
        res.json({
            tweets: data
        })
    })
})




module.exports = router