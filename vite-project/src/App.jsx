import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Product from "./components/Product";
import Warehouse from "./components/Warehouse";

function App() {
  return (
    <>
      <Product></Product>
      <Warehouse></Warehouse>
    </>
  );
}

export default App;
