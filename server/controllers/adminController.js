const db = require("../config/db");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/token");

const adminLogin = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM admins WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database Error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const admin = result[0];

    const isMatch = await bcrypt.compare(password.toString(), admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

  
    const token = createToken({
      id: admin.admin_id,
      email: admin.email,
      role: "admin",
    });

    res.status(200).json({
      message: "Admin Login Successful",
      token,
      admin: {
        id: admin.admin_id,
        name: admin.name,
        email: admin.email,
      },
    });
  });
};

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  try {
    const existingSql = "SELECT * FROM admins WHERE email = ?";
    const [existing] = await db.promise().query(existingSql, [email]);

    if (existing.length > 0) {
      return res.status(409).json({ message: "Admin with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertSql = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
    await db.promise().query(insertSql, [name, email, hashedPassword]);

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({ message: "Failed to create admin" });
  }
};

const getAllAppointments = (req,res)=>{

  const sql = `
    SELECT * FROM appointments
    ORDER BY appointment_date DESC
  `;


  db.query(sql,(err,result)=>{

    if(err){
      console.error(err);

      return res.status(500).json({
        message:"Database Error"
      });
    }


    res.status(200).json(result);

  });

};

const updateAppointmentStatus = (req,res)=>{

    const {id} = req.params;
    const {status} = req.body;


    const sql = 
    "UPDATE appointments SET status=? WHERE appointment_id=?";


    db.query(
        sql,
        [status,id],
        (err,result)=>{

            if(result.affectedRows === 0){
                return res.status(404).json({
                    message:"Appointment not found"
                });
            }

            res.json({
                message:"Status updated successfully"
            });

        }
    );

};

module.exports = { adminLogin, createAdmin, updateAppointmentStatus, getAllAppointments };