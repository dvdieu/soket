const redis = require('redis');
const sub = redis.createClient();
const redisCRUD = redis.createClient()
function init(io,socket){
    sub.on("message", function (channel, message) {
        console.log("Message '" + message + "' on channel '" + channel + "' arrived!")
        redisCRUD.hgetall("online", function (err, result) {
            io.emit("pong",result);
        })
    });
    sub.subscribe("catchTrip");
}

module.exports={
    init
}