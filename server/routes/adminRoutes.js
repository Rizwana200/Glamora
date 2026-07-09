const express = require("express");
const router = express.Router();
const { requireAdminAuth } = require("../middleware/auth")

const { adminLogin, createAdmin, updateAppointmentStatus,getAllAppointments } = require("../controllers/adminController");

router.post("/login", adminLogin);
router.post("/create", requireAdminAuth, createAdmin);
router.put("/appointments/:id/status", requireAdminAuth, updateAppointmentStatus);
router.get("/appointments", requireAdminAuth, getAllAppointments);

module.exports = router;