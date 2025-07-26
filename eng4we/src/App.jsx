import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthRoleProvider } from "./context/AuthRoleContext";
import AppRouter from "./routes/router";

export default function App() {
  return (
    <BrowserRouter>
      <AuthRoleProvider>
        <AppRouter />
      </AuthRoleProvider>
    </BrowserRouter>
  );
}
