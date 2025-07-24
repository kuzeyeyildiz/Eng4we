import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthRoleProvider, useAuthRole } from "./context/AuthRoleContext";
import VolunteerDashboard from "./pages/VolunteerDashboard.jsx";
import Dashboard from "./pages/Dashboard";
import Loading from "./pages/Loading";
import Login from "./pages/Login.jsx";

function AppRouter() {
  const { user, role, loading } = useAuthRole();

  if (loading) return <Loading />;

  if (!user) {
    return <Login />;
  }

  if (role === "volunteer") {
    return <VolunteerDashboard />;
  }

  return <Dashboard />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthRoleProvider>
        <AppRouter />
      </AuthRoleProvider>
    </BrowserRouter>
  );
}
