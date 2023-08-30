import dotenv from "dotenv";
dotenv.config();

import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./context/authContext.js";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const client = new ApolloClient({
  uri: `${process.env.URI}`,
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");
const appRoot = (
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>
);

const root = ReactDOM.createRoot(rootElement);
root.render(appRoot);
reportWebVitals();
