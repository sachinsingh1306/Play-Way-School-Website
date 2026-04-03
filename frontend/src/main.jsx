import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/Play-Way-School-Website/">
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);