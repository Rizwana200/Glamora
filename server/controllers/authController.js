const db = require("../config/db");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
   console.log("✅ Register API called");
  console.log(req.body);
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if email already exists
    const checkSql = "SELECT * FROM customers WHERE email = ?";

    db.query(checkSql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database Error" });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Email already registered",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql =
        "INSERT INTO customers (name, email, phone, password) VALUES (?, ?, ?, ?)";

      db.query(
        insertSql,
        [name, email, phone, hashedPassword],
        (err) => {
          if (err) {
            console.error("Registration Error:", err); 
            return res.status(500).json({
              message: "Registration Failed",
            });
          }

          res.status(201).json({
            message: "Registration Successful",
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const login = (req, res) => {
  console.log("✅ Login API called");
  console.log(req.body);

  const { email, password } = req.body;

  const sql = "SELECT * FROM customers WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Database Error",
      });
    }

    console.log("User found:", result);

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = result[0];

    console.log("Stored Password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user.customer_id,
        name: user.name,
        email: user.email,
      },
    });
  });
};

module.exports = { register, login };