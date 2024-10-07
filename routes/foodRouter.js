import express from "express";
import { addFood, listFood } from "../controllers/foodContoller.js";
import multer from "multer";

const foodRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  fileName: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// foodRouter.post("/add",upload.single('image'), addFood);
foodRouter.post("/add", addFood);
foodRouter.get('/list',listFood)

export default foodRouter;
