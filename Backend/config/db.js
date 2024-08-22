import mongoose from "mongoose";
import colors from "colors";

export const MongoDB = async () => {
  const URL = process.env.MONGO_URL;
  try {
    mongoose.connect(URL, {
      useNewUrlParser: true,
    });
    console.log(`connected to MongoDB`.bgMagenta.white);
  } catch (error) {
    console.log(`Error in MongoDB ${error}`.bgRed.white);
  }
};


