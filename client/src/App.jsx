import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import MyBookings from "./pages/Mybookings";

import Layout from "./pages/owner/Layout";
import AddCar from "./pages/owner/Addcar";
import ManageCars from "./pages/owner/Managecars";
import ManageBookings from "./pages/owner/Managebookings";
import Dashboard from "./pages/owner/Dashboard";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Toaster />
      <Navbar setShowModal={setShowModal} />
      {showModal && <AuthModal closeModal={() => setShowModal(false)} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} /> 
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-car" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
};

export default App;
