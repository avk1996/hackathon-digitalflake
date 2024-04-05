import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Home from "./Home";
import ProductTable from "../products/ProductTable";
import ProductForm from "../products/ProductForm";
import CategoryTable from "..//categories/CategoryTable";
import PopUp from "../layout/PopUp";
import CategoryForm from "../categories/CategoryForm";
import SignUp from "../auth/SignUp";

import Menu from "./Menu";

import NavBar from "./NavBarTop";

function MainPage() {
  return (
    <>
      <NavBar />
      <div className="d-flex flex-row">
        <div>
          <Menu />
        </div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product-table" element={<ProductTable />} />
          <Route path="/category-table" element={<CategoryTable />} />
          <Route path="/create-account" element={<SignUp />} />
          <Route
            path="/create-product"
            element={<ProductForm formType="new" />}
          />
          <Route
            path="/edit-product/:id"
            element={<ProductForm formType="edit" />}
          />
          <Route
            path="/create-category"
            element={<CategoryForm formType="new" />}
          />
          <Route
            path="/edit-category/:id"
            element={<CategoryForm formType="edit" />}
          />
          <Route path="/popup" element={<PopUp />} />
        </Routes>
      </div>
    </>
  );
}

export default MainPage;
