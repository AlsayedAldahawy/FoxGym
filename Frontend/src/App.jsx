// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import BMICalculator from "./components/Bmi";
import Members from "./components/Members";
import Coaches from "./components/Coaches";
import Login from "./components/Login";
import Home from "./components/Home";
import Owner from "./components/Owner";
import Trainer from "./components/Trainer";
import Footer from "./components/Footer"

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/bmi-calculator" element={<BMICalculator />} />
        <Route path="/members" element={<Members />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/login" element={<Login />} />
        <Route path="/owner" element={< Owner/>} />
        <Route path="/trainer" element={< Trainer />} />
      </Routes>
      <Footer />

    </Router>
  );
};

export default App;
