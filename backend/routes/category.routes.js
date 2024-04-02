const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());

// create
router.post("/open-flake/product", async (req, resp) => {
  try {
    const productResponse = await Product.create(req.body);
    resp.status(200).json(productResponse);
  } catch (error) {
    //send custom error
    resp.status(500).json({ message: error.message });
  }
});

// get all
router.get("/open-flake/category", async (req, resp) => {
  try {
    const CategoryResponse = await Category.find();
    resp.status(200).json(CategoryResponse);
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
});

// get by id
router.get("/open-flake/product/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    const singleProduct = await Product.findById(id);
    resp.status(200).json(singleProduct);
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
});

// update by id
router.put("/open-flake/product/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    const editProduct = await Product.findByIdAndUpdate(id, req.body);
    if (!editProduct)
      return resp.status(404).json({ message: "product not found" });

    const updatedProduct = await Product.findById(id);
    resp.status(200).json(updatedProduct);
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
});

// delete by id
router.delete("/open-flake/product/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct)
      return resp.status(404).json({ message: "product not found" });
    resp.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
});
