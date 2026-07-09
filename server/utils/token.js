const crypto = require("crypto");
const SECRET = process.env.JWT_SECRET || "styleup-dev-secret";

function base64UrlEncode(value) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(data) {
  return crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
}

function createToken(payload, expiresInSeconds = 60 * 60 * 8) {
  const body = {
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  };
  const encodedBody = base64UrlEncode(JSON.stringify(body));
  const signature = sign(encodedBody);
  return `${encodedBody}.${signature}`;
}

function verifyToken(token) {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encodedBody, signature] = parts;
  const expectedSignature = sign(encodedBody);

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }

  try {
    const decoded = JSON.parse(base64UrlDecode(encodedBody));
    if (!decoded.exp || Math.floor(Date.now() / 1000) >= decoded.exp) {
      return null;
    }
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = { createToken, verifyToken };