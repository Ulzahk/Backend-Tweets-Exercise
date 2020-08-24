'use strict'

const express = require('express')
const router = express.Router()
const { config } = require('../config/index')
const request = require('request')

router.get('/', async (req, res, next) => {
    try {
        let keyword = req.query.keyword
        keyword = keyword.toLocaleLowerCase().trim().replace(/\s+/g, '%20')
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
            res.render('results', {layout: 'index', data: data})
        })
        
    } catch (error) {
        next(error)
    }
})

module.exports = router