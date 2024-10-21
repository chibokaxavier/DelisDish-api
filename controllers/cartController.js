import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    // Find the user by id
    let userData = await userModel.findById(req.userId); // Use findById to match the userId correctly

    // Check if user exists
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Initialize cartData if not already initialized
    let cartData = userData.cartData || {};
    let cartItemID = req.body.itemId;
    let cartItem = await foodModel.findById(cartItemID);

    // Check if the itemId exists in cartData, if not, initialize it
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = {
        id: cartItem.id,
        name: cartItem.name,
        price: cartItem.price,
        quantity: 1,
      }; // Initialize the item with quantity 1
    } else {
      cartData[req.body.itemId].quantity += 1; // Increment the quantity if the item already exists
    }

    // Update the user's cartData
    const updatedCart = await userModel.findByIdAndUpdate(
      req.userId,
      { $set: { cartData } }, // Use $set to update only cartData
      { new: true }
    );

    // Send success response
    res.json({ success: true, message: "Added to cart", data: updatedCart });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    // Find the user by id
    let userData = await userModel.findById(req.userId); // Use findById to match the userId correctly

    // Check if user exists
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Initialize cartData if not already initialized
    let cartData = userData.cartData || {};

    // Check if the itemId exists in cartData
    if (cartData[req.body.itemId] && cartData[req.body.itemId].quantity > 0) {
      cartData[req.body.itemId].quantity -= 1; // Decrease the quantity

      // Remove the item if the quantity is now 0
      if (cartData[req.body.itemId].quantity === 0) {
        delete cartData[req.body.itemId]; // Completely remove the item
      }
    } else {
      return res.json({
        success: false,
        message: "Item not in cart or invalid quantity",
      });
    }

    // Update the user's cartData
    const updatedCart = await userModel.findByIdAndUpdate(
      req.userId,
      { $set: { cartData } }, // Use $set to update only cartData
      { new: true }
    );

    // Send success response
    res.json({
      success: true,
      message: "Removed from cart",
      data: updatedCart,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    // Find the user by id
    let userData = await userModel.findById(req.userId); // Use findById to match the userId correctly

    // Check if user exists
    if (!userData) {
      return res.json({ success: false, message: "User not found" }); 
    }

    // Initialize cartData if not already initialized
    let cartData = userData.cartData || {};

    // Send success response
    res.json({ success: true, data: cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
