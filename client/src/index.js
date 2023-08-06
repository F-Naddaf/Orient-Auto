import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./context/authContext.js";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const client = new ApolloClient({
  uri: "http://localhost:4880/graphql",
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

ReactDOM.render(appRoot, rootElement);
reportWebVitals();
