const db = require("../models");
const Driver = db.Auth;
module.exports = {
    pushgps: async (req, res) => {
        if (!req.body) {
            res.status(400).send({message: "Content can not be empty!"});
            return;
        }
        let lat = req.body.lat;
        let lng = req.body.lng;
        let direction = req.body.direction;
        let velocity = req.body.velocity;
        let radius = req.body.radius;
        let driverHashId = req.body.driverHashId;
        let authInfoUser = await Auth.findOne({"username": userName, "password": passWord});
        res.send({
            "status": "OK",
            "message": "Login successfull",
            "driverHashId": authInfoUser.id
        });
    },

}