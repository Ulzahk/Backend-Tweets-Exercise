'use strict'

const errorHandler = require('./errorHandler')
const redis = require('redis')
const client =  redis.createClient();

module.exports = {
    getTweets: async () => {
        let tweets = []
        try {
            tweets = await client.lrange('list:tweets',-100, 100, async function (err, key){
                let redisDataArray = []
                for (let i = 0; i < key.length; i++){
                    redisDataArray.push(JSON.parse(key[i]))
                }
                return redisDataArray
            })
        } catch (error) {
            errorHandler(error)
        }
        return tweets
    }
}