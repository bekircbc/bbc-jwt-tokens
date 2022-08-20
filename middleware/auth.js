import jwt from "jsonwebtoken";
import { config } from "../config.js";

// SECURITY GUARD (Türsteher)
export const auth = (req, res, next) => {
  const token = req.headers.authorization;

  // no token => no party!
  if (!token) {
    return next({ status: 401, message: "No token provided! Raus hier!" });
  }

  try {
    const decodedDate = jwt.verify(token, config.JWT_SECRET);
    next(); // lass durch
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
