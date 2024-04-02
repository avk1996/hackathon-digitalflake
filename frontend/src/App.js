import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductTable from "./components/products/ProductTable";
import Menu from "./components/layout/Menu";
import CategoryTable from "./components/categories/CategoryTable";

function App() {
  return (
    <>
      <ProductTable />
      <CategoryTable />
      <Menu />
      <Routes>
        <Route></Route>
      </Routes>
    </>
  );
}

export default App;
