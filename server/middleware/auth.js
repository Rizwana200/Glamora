const { verifyToken } = require("../utils/token");

function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" "); // "Bearer <token>"

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const payload = verifyToken(token);

  if (!payload || payload.role !== "admin") {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  req.admin = payload; // handlers downstream can now read req.admin
  next();
}

module.exports = { requireAdminAuth };