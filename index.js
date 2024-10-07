import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import foodRouter from "./routes/foodRouter.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOption = {
  origin: [
    "http://localhost:3000/", // or your specific localhost port
  ],
  credentials: true,
};

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoose connected to the database");
  } catch (error) {
    console.log(error.message);
  }
};
// middleware 
app.use(express.json());
app.use(cors(corsOption));
app.use("/api/food", foodRouter);


app.listen(port, () => {
  connectDb();
  console.log(`listening on ${port}`);
});
