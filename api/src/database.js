import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { MONGODB_PATH } = process.env;

export async function connect() {
  try {
    await mongoose.connect(MONGODB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(">>> DB is connected");
  } catch (err) {
    console.log("Something went wrong");
    console.error(err);
  }
}
