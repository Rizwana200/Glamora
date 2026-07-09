const { createToken } = require("../utils/token");
const db = require("../config/db");

const createAppointment = (req, res) => {
  const {
    customer_id,
    customer_name,
    phone,
    service,
    appointment_date,
    appointment_time,
  } = req.body;

  const sql = `
    INSERT INTO appointments
    (customer_id, customer_name, phone, service, appointment_date, appointment_time)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      customer_id,
      customer_name,
      phone,
      service,
      appointment_date,
      appointment_time,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Error booking appointment",
        });
      }

      res.status(201).json({
        message: "Appointment booked successfully!",
      });
    }
  );
};

const getAppointmentsByCustomer = (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM appointments WHERE customer_id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Error fetching appointments",
      });
    }

    res.status(200).json(results);
  });
};

module.exports = { createAppointment, getAppointmentsByCustomer };