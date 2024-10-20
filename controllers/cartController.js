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

    // Check if the itemId exists in cartData, if not, initialize it
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = { quantity: 1 }; // Initialize the item with quantity 1
    } else {
      cartData[req.body.itemId].quantity += 1; // Increment the quantity if the item already exists
    }

    // Update the user's cartData
    await userModel.findByIdAndUpdate(
      req.userId,
      { $set: { cartData } }, // Use $set to update only cartData
      { new: true }
    );

    // Send success response
    res.json({ success: true, message: "Added to cart" });
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

    // Check if the itemId exists in cartData, if not, initialize it
    if (!cartData[req.body.itemId].quantity > 0) {
      cartData[req.body.itemId].quantity -= 1; // Increment the quantity if the item already exists
    } // Initialize the item with quantity 1

    // Update the user's cartData
    await userModel.findByIdAndUpdate(
      req.userId,
      { $set: { cartData } }, // Use $set to update only cartData
      { new: true }
    );

    // Send success response
    res.json({ success: true, message: "Removed from cart" });
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
        res.json({ success: true, cartData});
      } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
      }

};

export { addToCart, removeFromCart, getCart };
