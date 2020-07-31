const router = require("express").Router();
const driverController = require("../controllers/driver.controller");

router.post("/pushgps",driverController.pushgps)

module.exports=router;