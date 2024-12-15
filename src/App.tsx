import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout";
import CarLayout from "./Components/Car/CarLayout";
import CarDetail from "./Components/Car/CarDetail";
import CarCreate from "./Components/Car/CarCreate";
import CarModify from "./Components/Car/CarModify";
import Home from "./Components/Home";
import NotFoundPage from "./Components/NotFoundPage";
import Info from "./Components/Info";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="info" element={<Info />} />
            <Route path="cars" element={<CarLayout />}>
              <Route path=":id" element={<CarDetail />} />
            </Route>
            <Route path="create" element={<CarCreate />} />
            <Route path="edit/:id" element={<CarModify />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
