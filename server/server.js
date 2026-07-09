require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const appointmentRoutes = require("./routes/appointmentRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const serviceRoutes = require("./routes/serviceRoutes");



const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoutes);

app.get("/", (req, res) => {
  res.send("Style Up Studio API Running...");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
