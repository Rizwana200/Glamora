const getAppointmentsByCustomer = (req, res) => {
  const customerId = req.params.id;

  const sql = `
    SELECT *
    FROM appointments
    WHERE customer_id = ?
    ORDER BY appointment_date DESC
  `;

  db.query(sql, [customerId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.json(result);
  });
};
module.exports = {
  createAppointment,
  getAppointmentsByCustomer,
};