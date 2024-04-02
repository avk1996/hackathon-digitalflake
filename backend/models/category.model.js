const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"], // Example status values
      required: true,
    },
  },
  { timestamps: true }
);

// Create a model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
