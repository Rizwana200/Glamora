const express = require("express");
const router = express.Router();
const {createAppointment,getAppointmentsByCustomer} = require("../controllers/appointmentController");
    router.get("/:id", getAppointmentsByCustomer);
    router.post("/", createAppointment);

module.exports = router;