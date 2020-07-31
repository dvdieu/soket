const router = require("express").Router();
const tripController = require("../controllers/trip.controller");

router.post("/create",tripController.insertTrip)
router.post("/",tripController.getTripById)
router.post("/driver_in_charge",tripController.getTripOfDiver)
// router.post("/gettrip/withdate",tripController.insertTrip)

module.exports=router;