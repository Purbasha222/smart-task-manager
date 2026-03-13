import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("=== AUTH MIDDLEWARE ===");
  console.log("Authorization header:", token);
  console.log("TOKEN FROM HEADER:", token);

  if (!token) {
    return res.json({ message: "No token provided" });
  }

  try {
    const data = jwt.verify(token.split(" ")[1], "secretkey123");
    console.log("Decoded token data:", data);
    req.userId = data.id;
    console.log("req.userId set to:", req.userId);
    next();
  } catch (error) {
    return res.json({ message: "Invalid token" });
  }
};

export default auth;
