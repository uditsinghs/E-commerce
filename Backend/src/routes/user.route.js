import express from "express";
import {
  forgetPassword,

  getAllUsers,

  loginUser,
  registerUser,
  updateProfile,
} from "../controllers/user.controller.js";
import { isAdmin, verifyJWT } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forget-password", forgetPassword);
router.get("/getall",getAllUsers)
router.get("/user-auth", verifyJWT, (req, res) => {
  try {
    res.status(200).send({ ok: true });
  } catch (error) {
    res.status(500).send({ Message: "something went wrong" });
  }
});

// admin auth
router.get("/admin-auth", verifyJWT, isAdmin, (req, res) => {
  try {
    res.status(200).send({ ok: true });
  } catch (error) {
    res.status(500).send({ Message: "something went wrong" });
  }
});
router.put("/update-profile", verifyJWT, updateProfile);
export default router;

// 2.54
