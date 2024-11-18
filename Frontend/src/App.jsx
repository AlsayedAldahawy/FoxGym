// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import BMICalculator from "./pages/Bmi";
import Members from "./pages/Members";
import Coaches from "./components/Coaches";
import Login from "./pages/Login";
import Home from "./components/Home";
import Owner from "./components/Owner";
import Trainer from "./components/Trainer";
import Footer from "./components/Footer"
import AddNewMember from "./pages/addNewMember"

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
        <Route path="/add-new-member" element={< AddNewMember />} />
      </Routes>
      <Footer />

    </Router>
  );
};

export default App;
