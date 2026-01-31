import { verifyToken } from "../utils/jwt.js";

const protect = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const user = verifyToken(token);
    console.log("Verified User:", user);
    req.user = user;
    console.log("Authenticated User ID:", req.user.id);

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
export default protect;
