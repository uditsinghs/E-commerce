import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send({ message: "Not Authorized user" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res
      .status(500)
      .send({ message: "Error verifying token", success: false, error });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 1) {
      return res
        .status(401)
        .send({ message: "Unauthorized user", success: false });
    }
    next();
  } catch (error) {
    console.error("Admin check error:", error);
    res
      .status(500)
      .send({ message: "Error in admin verification", success: false, error });
  }
};
