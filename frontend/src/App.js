import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/layout/Login";
import MainPage from "./components/layout/MainPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Login />
        {/* <MainPage /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
