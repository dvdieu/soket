const redis = require('redis');
const publisher = redis.createClient();

module.exports = {
    publish:(channel,payload)=>{
        publisher.publish(channel, JSON.stringify(payload))
    }
}