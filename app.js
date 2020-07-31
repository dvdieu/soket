const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// mongoose init
const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to Feedback application."});
});

app.use('/auth', require('./app/routes/auth.routes'));
app.use('/trip', require('./app/routes/trip.routes'));
app.use('/driver', require('./app/routes/driver.routes'));
// set port, listen for requests
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

/**
 * SOCKETIO
 */

const redis = require('redis');
const redisCRUD = redis.createClient()
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('disconnect', ()=>{
        redisCRUD.hdel("online",socket.id);
    });
    console.log(socket);
    socket.on('register', function (data) {
        console.log(JSON.stringify(data))
        socket.emit("pong", socket.id);
        redisCRUD.hset('online', socket.id, JSON.stringify(data));
    })
});


/**
 * SUBS REDIS
 */

const redisProcessEvent = require("./app/redis/subscribe")
redisProcessEvent.init(io);



