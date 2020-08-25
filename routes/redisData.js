const express = require('express')
const router = express.Router()
const redis = require('redis')
const client =  redis.createClient();

router.get('/', async (req, res, next) =>{
    try {
        client.lrange('list:tweets',-100, 100, async function (err, key){
            let redisDataArray = []
            for (let i = 0; i < key.length; i++){
                redisDataArray.push(JSON.parse(key[i]))
            }
            let totalTweets = key.length
            console.log(redisDataArray)
            res.render('redisData', {layout: 'index', data: redisDataArray, totalTweets: totalTweets} )
        })   
    } catch (error) {
        next(error)
    }
} )


module.exports = router;