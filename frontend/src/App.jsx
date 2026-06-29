import React from 'react';
import "./App.css";
import { Routes, Route } from "react-router-dom"
import Home from './pages/home/Home.jsx';
import Header from './components/header/Header';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Verify from './pages/auth/Verify.jsx';
import Footer from './components/footer/Footer.jsx';
import About from './pages/about/About.jsx';
import Account from './pages/account/Account.jsx';
import { UserData } from './context/User.jsx';
import Courses from './pages/courses/Courses.jsx';
import CourseDescription from './components/coursedescription/CourseDescription.jsx';
import PaymentSuccess from './pages/paymentsuccess/PaymentSuccess.jsx';

const App = () => {
  const { isAuth, user } = UserData();

  return (
    <>
      <Header isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/account" element={isAuth ? <Account user={user} /> : <Login />} />
        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
        <Route path="/register" element={isAuth ? <Home /> : <Register />} />
        <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
        <Route path="/course/:id" element={isAuth ? <CourseDescription user={user}/> : <Login />} />
        <Route path="/payment-success/:id" element={isAuth ? <PaymentSuccess user={user}/> : <Login />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App