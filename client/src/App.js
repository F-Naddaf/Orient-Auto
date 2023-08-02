import React from "react";
import { Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import NavBar from "./components/navigationBar/NavBar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/ContactUs";
import Vehicles from "./pages/Vehicles";

const client = new ApolloClient({
  uri: "http://localhost:4880/graphql",
  cache: new InMemoryCache(),
  // uri: process.env.URI,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/vehicles" element={<Vehicles />} />
        </Routes>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
