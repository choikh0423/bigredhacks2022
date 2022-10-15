import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import { Routes, Route, useNavigate, Outlet} from "react-router-dom";
import Detail from './pages/Detail.js'




function App() {
  const [apt, setApt] = useState('');

  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<div>Main Page</div>} />
            <Route path="/detail/:apt/:type" element={<Detail input={apt}/>} />
            <Route path="*" element={<div>Page not exists</div>} />
        </Routes>
    </div>
  );
}

export default App;
