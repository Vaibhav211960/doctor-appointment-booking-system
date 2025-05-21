const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // console.log("Request Headers:", req.headers); // Log headers to check the token
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token
  console.log("Extracted Token:", token); // Log the extracted token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("Decoded Token:", decoded); // Log decoded data


    req.user = decoded;
    // console.log("User:", req.user);
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = { authMiddleware };
