import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import { MongoDB } from "./src/config/db.js";
import userRouter from "./src/routes/user.route.js";
import categoryRouter from './src/routes/category.route.js'
import productRouter from './src/routes/product.route.js'
import cors from 'cors'

const PORT = process.env.PORT || 3000;
// predefined middlewares
app.use(express.json());
app.use(cors())
app.use(morgan("dev"));

//routes -api
app.use("/api/v1/users", userRouter);
app.use('/api/v1/category',categoryRouter)
app.use('/api/v1/product',productRouter)
// mongoDB connection
MongoDB();
app.listen(PORT, () => {
  console.log(`Server is listen port: ${PORT}`);
});
