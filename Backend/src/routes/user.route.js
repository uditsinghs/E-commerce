import express from "express";
import {
  forgetPassword,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { isAdmin, verifyJWT } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forget-password", forgetPassword);
router.get("/user-auth", verifyJWT, (req, res) => {
  try {
    res.status(200).send({ ok: true });
  } catch (error) {
    res.status(500).send({ Message: "something went wrong" });
  }
});

export default router;

// 2.54
