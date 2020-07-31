const db = require("../models");
const publishEvent = require("../redis/pub");
const Trip = db.Trip;
module.exports = {
    insertTrip: async (req, res) => {
        /**
         * customer_name:String,
         description: String,
         from_point: String,
         to_point: String,
         from_lng: String,
         to_lat: String,
         status: String,
         mobile: String,
         max_driver_for_capture:Number,
         */
        if (!req.body) {
            res.status(400).send({message: "Content can not be empty!"});
            return;
        }
        let tripRequest = new Trip(req.body);
        tripRequest.driverId_in_trip = "";
        tripRequest.driverId_for_capture = "";
        tripRequest.driverId_for_excluded = [];
        tripRequest.created_date = Date.now()
        let tripInsert = await Trip.create(tripRequest);
        publishEvent.publish("catchTrip", tripInsert);
        res.send(tripInsert);
    },
    ///////////////////////////
    ///////////////////////////
    getTripOfDiver: async (req, res) => {
        if (!req.body) {
            res.status(400).send({message: "Content can not be empty!"});
            return;
        }
        let driverHashId = req.body.driverHashId;
        let tripHashId = req.body.tripHashId;
        if (driverHashId == undefined || driverHashId.length == 0 || tripHashId == undefined || tripHashId.length == 0) {
            res.status(400).send({message: "Content can not be empty!"});
            return;
        }
        let tripOfDriver = await Trip.findById(tripHashId);
        if (tripOfDriver == null) {
            res.send({'status': 'ERROR', 'message': 'Trip not exists'})
            return;
        }
        if (tripOfDriver.driverId_for_capture === "") {
            res.send({'status': 'ERROR', 'message': 'Bạn chưa nhận quốc xe này'})
            return;
        }
        if (tripOfDriver.driverId_for_capture != driverHashId) {
            res.send({'status': 'ERROR', 'message': 'Quốc xe này đã được nhận bởi tài xế khác'})
            return;
        } else {
            res.send({
                "status": "OK",
                "message": "Login successfull",
                "payload": tripOfDriver
            });
        }
    },
    ///////////////////////////
    ///////////////////////////
    getTripById: async (req, res) => {
        if (!req.body) {
            res.status(400).send({message: "Content can not be empty!"});
            return;
        }
        let tripHashId = req.body.tripHashId;
        if (tripHashId == undefined || tripHashId.length == 0) {
            res.status(400).send({message: "Content can not be empty!"});
            return;
        }
        let tripOfDriver = await Trip.findById(tripHashId);
        if (tripOfDriver == null) {
            res.send({'status': 'ERROR', 'message': 'Trip not exists'})
            return;
        } else {
            res.send({
                "status": "OK",
                "message": "Login successfull",
                "payload": tripOfDriver
            });
        }
    }
}