import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  //   let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
  });
  try {
    await food.save();
    res.status(200).json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({ succes: true, data: foods });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeFood = async (req, res) => {
  try {
    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addFood, listFood, removeFood };
