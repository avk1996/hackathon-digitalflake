import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./components/layout/Home";
import ProductTable from "./components/products/ProductTable";
import ProductForm from "./components/products/ProductForm";
import CategoryTable from "./components/categories/CategoryTable";
import PopUp from "./components/layout/PopUp";
import MainPage from "./components/layout/MainPage";
import CategoryForm from "./components/categories/CategoryForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </>
  );
}

export default App;
