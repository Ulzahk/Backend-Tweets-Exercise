'use strict'

const express = require('express')
const router = express.Router()
const { config } = require('../config/index')
const request = require('request')
const amqp = require("amqplib/callback_api");



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
            let message = body
            if( keyword === 'platzi' || keyword === 'node' || keyword === 'open%20source' ){
                console.log(keyword)

                amqp.connect("amqp://localhost", function (error0, connection) {
                if (error0) {
                    throw error0;
                }
                connection.createChannel(function (error1, channel) {
                    if (error1) {
                    throw error1;
                    }
                    let queue = "tweets";
                    let msg = message;

                    channel.assertQueue(queue, {
                    durable: false,
                    });

                    channel.sendToQueue(queue, Buffer.from(msg));
                    /* console.log(" [x] Sent %s", msg); */
                });
                
                setTimeout(function () {
                    connection.close();
                }, 500);
                });

            }
            res.render('results', {layout: 'index', data: data})
        })
        
    } catch (error) {
        next(error)
    }
})

module.exports = router