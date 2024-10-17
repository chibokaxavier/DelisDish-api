import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodContoller.js";
import multer from "multer";

const foodRouter = express.Router();

foodRouter.post("/add", addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/delete", removeFood);

export default foodRouter;
