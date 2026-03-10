import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({ message: "No token provided" });
  }

  try {
    const data = jwt.verify(token.split(" ")[1], "secretkey123");
    req.userId = data.id;
    next();
  } catch (error) {
    return res.json({ message: "Invalid token" });
  }
};

export default auth;
