const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// routes
const Product = require("./models/product.module");
const Category = require("./models/category.model");

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://kumbhara976:x9XvZuQKrdQx2bh7@foodproductsdb.z411qjw.mongodb.net/open-flake?retryWrites=true&w=majority&appName=FoodProductsDB"
  )
  .then(() => {
    console.log("mongo db connected");
  })
  .catch((error) => {
    console.log("error connection: " + error);
  });

// Product CURD operations

// create
app.post("/digital-flake/product", async (req, resp) => {
  try {
    const productResponse = await Product.create(req.body);
    resp.status(200).json(productResponse);
  } catch (error) {
    //send custom error
    resp.status(500).json({ message: error.message });
  }
});

// get all
app.get("/digital-flake/products", async (req, resp) => {
  try {
    const productResponse = await Product.find();
    console.log(productResponse);
    resp.status(200).json(productResponse);
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
});

// get by id
app.get("/digital-flake/product/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    const singleProduct = await Product.findById(id);
    resp.status(200).json(singleProduct);
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
});

// update by id
app.put("/digital-flake/product/:id", async (req, resp) => {
  try {
    console.log("inside put method");
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
app.delete("/digital-flake/product/:id", async (req, resp) => {
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

// category curd operation

// read
app.get("/digital-flake/category", async (req, resp) => {
  try {
    const categoryResponse = await Category.find();
    resp.status(200).json(categoryResponse);
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
});

// create
app.post("/digital-flake/category", async (req, resp) => {
  try {
    const categoryResponse = await Category.create(req.body);
    console.log("category added: " + categoryResponse);
    resp.status(200).json(categoryResponse);
  } catch (error) {
    //send custom error
    resp.status(500).json({ message: error.message });
  }
});

// get by id
app.get("/digital-flake/category/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    const singleCategory = await Category.findById(id);
    resp.status(200).json(singleCategory);
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
});

// update
app.put("/digital-flake/category/:id", async (req, resp) => {
  try {
    console.log("inside put method");
    const { id } = req.params;
    const editCategory = await Category.findByIdAndUpdate(id, req.body);
    if (!editCategory)
      return resp.status(404).json({ message: "Category not found" });

    const updatedCategory = await Category.findById(id);
    resp.status(200).json(updatedCategory);
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
});

// update status
app.put("/digital-flake/update-category-status/:id", async (req, resp) => {
  try {
    const { id } = req.params;

    const filter = { _id: id };

    const updateStatus = { $set: { status: "inactive" } };

    const editCategoryStatus = await Category.updateOne(filter, updateStatus);

    if (!editCategoryStatus)
      return resp.status(404).json({ message: "Category not found" });

    resp.status(200).json({ message: "status inactive success" });
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
});

// delete by id
app.delete("/digital-flake/category/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    const deleteCategory = await Category.findByIdAndDelete(id);
    if (!deleteCategory)
      return resp.status(404).json({ message: "Category not found" });
    resp.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
});

app.listen(2000, () => {
  console.log("port started");
});
