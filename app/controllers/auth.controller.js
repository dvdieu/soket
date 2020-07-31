const db = require("../models");
const redis = require('redis');
const clientRedis = redis.RedisClient;
const Auth = db.Auth;
module.exports = {
    register: (req, res) => {
        // Validate request
        if (!req.body) {
            res.status(400).send({message: "Content can not be empty!"});
            return;
        }
        const auth = new Auth({
            username: "hoa",
            password: "123"
        });
        auth.save(auth)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                if (err.code === 11000) {
                    res.status(500).send({
                        message: "User exists"
                    });
                    return;
                }
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the FeedBack."
                });
            });
    },
    login: async (req, res) => {
        if (!req.body) {
            res.status(400).send({message: "Content can not be empty!"});
            return;
        }
        let userName = req.body.username;
        let passWord = req.body.password;
        if (userName == undefined || userName.length == 0 || passWord == undefined || passWord.length == 0) {
            res.status(400).send({message: "Content can not be empty!"});
            return;
        }
        let authInfoUser = await Auth.findOne({"username": userName, "password": passWord});

        res.send({
            "status": "OK",
            "message": "Login successfull",
            "driverHashId": authInfoUser.id
        });
    }
}