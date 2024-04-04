import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductTable from "../products/ProductTable";
import Menu from "./Menu";
import CategoryTable from "../categories/CategoryTable";
import CreateProduct from "../products/CreateProduct";
import CreateCategory from "../categories/CreateCategory";
import EditCategory from "../categories/EditCategory";
import Home from "./Home";
import NavBar from "./NavBarTop";
import PopUp from "./PopUp";

function MainPage() {
  return (
    <>
      <NavBar />
      <div className="d-flex flex-row">
        <div>
          <Menu />
        </div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/product-table" element={<ProductTable />} />
          <Route path="/category-table" element={<CategoryTable />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/edit-category/:id" element={<EditCategory />} />
          <Route path="/popup" element={<PopUp />} />
        </Routes>
      </div>
    </>
  );
}

export default MainPage;
