import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout";
import CarLayout from "./Components/Car/CarLayout";
import CarList from "./Components/Car/CarList";
import CarDetail from "./Components/Car/CarDetail";
import CarCreate from "./Components/Car/CarCreate";
import CarModify from "./Components/Car/CarModify";
import CarDelete from "./Components/Car/CarDelete";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cars" element={<CarLayout />}>
            <Route index element={<CarList />} />
            <Route path=":id" element={<CarDetail />} />
          </Route>
          <Route path="create" element={<CarCreate />} />
          <Route path="edit/:id" element={<CarModify />} />
          <Route path="delete/:id" element={<CarDelete />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
