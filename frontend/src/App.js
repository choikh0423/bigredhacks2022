import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  Table,
  FormControl,
  Button,
  Form,
  Container,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Detail from "./pages/Detail.js";
import Navigation from "./components/Navbar.js";
import Main from "./Main.js";
import AddNew from "./pages/AddNew";

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:apt/:type" element={<Detail />} />
        <Route path="/add" element={<AddNew />} />
        <Route path="*" element={<div>Page not exists</div>} />
      </Routes>
    </div>
  );
}

export default App;
