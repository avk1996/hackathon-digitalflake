const mongoose = require("mongoose");

// Define schema
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    packSize: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // Assuming image path or URL
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      required: true,
    },
  },
  { timestamps: true }
);

// Create a model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
