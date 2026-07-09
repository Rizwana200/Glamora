const db = require("../config/db");

const getServices = (req, res) => {
  const sql = "SELECT * FROM services ORDER BY service_id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database Error", error:err.message });
    }

    res.json(result);
  });
};

const addService = (req, res) => {
  const { service_name, price, description } = req.body;

  if (!service_name || !price) {
    return res.status(400).json({ message: "Service name and price are required" });
  }

  const sql = "INSERT INTO services(service_name, price, description) VALUES(?,?,?)";

  db.query(sql, [service_name, price, description || ""], (err) => {
    if (err) {
      return res.status(500).json({ message: "Insert Failed", error: err.message });
    }

    res.json({ message: "Service Added" });
  });
};

const updateService = (req, res) => {
  const { id } = req.params;
  const { service_name, price, description } = req.body;

  if (!service_name || !price) {
    return res.status(400).json({ message: "Service name and price are required" });
  }

  const sql = "UPDATE services SET service_name = ?, price = ?, description = ? WHERE service_id = ?";

  db.query(sql, [service_name, price, description || "", id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Update Failed", error:err.message});
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service Updated" });
  });
};

const deleteService = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM services WHERE service_id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Delete Failed", error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service Deleted" });
  });
};

module.exports = {
  getServices,
  addService,
  updateService,
  deleteService,
};
