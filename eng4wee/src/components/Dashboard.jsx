import React, { useState } from "react";

const navButton = {
  margin: "0 8px",
  padding: "8px 20px",
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "1rem",
  cursor: "pointer",
};

const pageStyle = {
  maxWidth: 400,
  margin: "40px auto",
  background: "#fff",
  borderRadius: 10,
  boxShadow: "0 2px 16px #0002",
  padding: 32,
  textAlign: "center",
};

function Dashboard({ setPage, setIsLogged }) {
  return (
    <div style={pageStyle}>
      <h2 style={{ color: "#1976d2" }}>Dashboard</h2>
      <p>Welcome, user!</p>
      <button
        style={navButton}
        onClick={() => {
          setIsLogged(false);
          setPage("home");
        }}
      >
        Log Out
      </button>
    </div>
  );
}
export default Dashboard;
