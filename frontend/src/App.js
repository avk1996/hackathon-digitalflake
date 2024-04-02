import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductTable from "./components/products/ProductTable";
import Menu from "./components/layout/Menu";
import CategoryTable from "./components/categories/CategoryTable";
import CreateProduct from "./components/products/CreateProduct";
import CreateCategory from "./components/categories/CreateCategory";
import Home from "./components/Home";
import NavBar from "./components/NavBarTop";

function App() {
  return (
    <div className="d-flex flex-column">
      <div>
        <NavBar />
        <Menu />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product-table" element={<ProductTable />}></Route>
        <Route path="/category-table" element={<CategoryTable />}></Route>
        <Route path="/create-product" element={<CreateProduct />}></Route>
        <Route path="/create-category" element={<CreateCategory />}></Route>
      </Routes>
    </div>
  );
}

export default App;
