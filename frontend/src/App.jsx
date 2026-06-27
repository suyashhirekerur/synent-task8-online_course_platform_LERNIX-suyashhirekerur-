import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/home/Home.jsx';
import Header from './components/header/Header';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Verify from './pages/auth/Verify.jsx';
import Footer from './components/footer/Footer.jsx';

const App = () => {
  return <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </>
}

export default App