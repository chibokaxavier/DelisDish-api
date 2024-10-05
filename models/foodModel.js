import mongoose, { Schema } from "mongoose";

const foodSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, require: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const foodModel = mongoose.model("food", foodSchema);
export default foodModel;
