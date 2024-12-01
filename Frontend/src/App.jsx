// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";

import BMICalculator from "./pages/Bmi";
import Members from "./pages/Members";
import Coaches from "./components/Coaches";
import Login from "./pages/Login";
import Home from "./components/Home";
import Owner from "./components/Owner";
import Trainer from "./components/Trainer";
import AddNewMember from "./pages/addNewMember";
import AuthProvider from "./context/AuthContext"; // Update path as per your project
import ProtectedRoute from "./components/protectedRoute"; // Update path as per your project
import MemberPage from "./components/MemberPage";
import NotFound from "./components/Notfound";

const App = () => {

  return (
    <AuthProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/coaches" element={<Coaches />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Login/>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/members" element={<Members />} />
            <Route path="/add-new-member" element={<AddNewMember />} />
            <Route path="/member/:id" element={<MemberPage />} />
          </Route>
          {/* <Route path="/owner" element={< Owner/>} /> */}
          {/* <Route path="/trainer" element={< Trainer />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
