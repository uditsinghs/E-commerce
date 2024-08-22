import express from 'express'
const app = express();
import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan';
import { MongoDB } from './config/db.js';

const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(morgan('dev'))
MongoDB()
app.listen(PORT , ()=>{
  console.log(`Server is listen port: ${PORT}`);
  
})