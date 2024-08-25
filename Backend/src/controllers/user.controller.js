import { User } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../helper/auth.js";
import jwt from "jsonwebtoken";
// register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, address, answer } = req.body;
    // validation
    if (!name) {
      res.status(400).send({ message: "name is required" });
    }
    if (!email) {
      res.status(400).send({ message: "email is required" });
    }
    if (!password) {
      res.status(400).send({ message: "password is required" });
    }
    if (!phone) {
      res.status(400).send({ message: "phone is required" });
    }
    if (!address) {
      res.status(400).send({ message: "address is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    // find user
    const user = await User.findOne({ email });
    // check user is not already exist
    if (user) {
      res.status(400).send({ message: "user is already exist" });
    }
    // hash password
    const hashedPassword = await hashPassword(password);
    // Register user

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
      answer,
    });
    // if user create successfully check for user
    if (!newUser) {
      res.status(500).send({ message: "something went wrong" });
    }
    //  send the new user to frontend
    res
      .status(201)
      .send({ message: "user created successfully", success: true, newUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, error, message: "Error in registration" });
  }
};

// login user
export const loginUser = async (req, res) => {
  try {
    // get data from client
    const { email, password } = req.body;
    // validation
    if (!email) {
      res.status(400).send({ message: "email is required" });
    }
    if (!password) {
      res.status(400).send({ message: "password is required" });
    }

    // find user
    const user = await User.findOne({ email });

    const match = comparePassword(password, user.password);
    if (!match) {
      res.status(404).json({ message: "invalid crendintials", success: false });
    }
    // generate token

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // send data to client
    res.status(200).send({
      message: "user login successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: "Error in login" });
  }
};

// forget-password

export const forgetPassword = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "newPassword is required" });
    }
    const user = await User.findOne({ email, answer });
    if (!user) {
      return res
        .status(404)
        .send({ message: "user not exist", success: false });
    }
    const hashedPassword = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    res
      .status(200)
      .send({ message: "password Reset successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
      success: false,
      error,
    });
  }
};
