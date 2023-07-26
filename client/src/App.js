import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navigationBar/NavBar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/shoppingCart" element={<ShoppingCartPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/my-orders" element={<OrdersHistoryPage />} />
        <Route path="/mealDetail/:mealId" element={<MealDetailPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/payment" element={<Payment />} />
        <Route path="/create-meal" element={<CreateMeal />} />
        <Route path="/edit-meal/:id" element={<EditMeal />} />
        <Route path="/order-to-prepare" element={<OrderToPrepare />} />
        <Route path="/favorite-chefs" element={<FavoritesPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
