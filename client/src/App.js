import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
// import { ApolloProvider } from "react-apollo";
// import client from "./apolloClient.js";
import "./App.css";
import ShowNavBar from "./components/showNavBar/ShowNavBar";
import ShowFooter from "./components/showFooter/ShowFooter";
import NavBar from "./components/navigationBar/NavBar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/ContactUs";
import Vehicles from "./pages/Vehicles";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <ShowNavBar>
          <NavBar />
        </ShowNavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ShowFooter>
          <Footer />
        </ShowFooter>
      </div>
    </Router>
  );
}

export default App;
