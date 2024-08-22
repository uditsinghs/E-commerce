import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import { MongoDB } from "./src/config/db.js";
import userRouter from "./src/routes/user.route.js";

const PORT = process.env.PORT || 3000;
// predefined middlewares
app.use(express.json());
app.use(morgan("dev"));

//routes -api
app.use("/api/v1/users", userRouter);
// mongoDB connection
MongoDB();
app.listen(PORT, () => {
  console.log(`Server is listen port: ${PORT}`);
});
