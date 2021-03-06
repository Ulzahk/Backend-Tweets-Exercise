
var amqp = require('amqplib/callback_api');
const redis = require('redis');
const client =  redis.createClient();


amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'tweets';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            /* console.log(" [x] Received %s", msg.content.toString()); */
            let stringMsg = msg.content.toString()
            
            console.log('\n')

            /* client.del('list:tweets') */
            client.lpush('list:tweets', stringMsg, redis.print )
            
        }, {
            noAck: true
        });
    });
});
