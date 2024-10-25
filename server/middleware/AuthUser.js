import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function AuthToken(req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    req.role = decoded.role;

    if (req.role !== "user") {
      return res.status(403).json({ msg: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while verifying token" });
  }
}
export default AuthToken;
