import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { isAdmin, verifyJWT } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", verifyJWT, isAdmin, loginUser);

export default router;
