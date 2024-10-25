import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  syncCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.get("/get", authMiddleware, getCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/sync", authMiddleware, syncCart);

export default cartRouter;
