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

function Home({ setPage }) {
  return (
    <div style={pageStyle}>
      <h2 style={{ color: "#1976d2" }}>Home</h2>
      <p>Welcome! Please sign up or log in to continue.</p>
      <div style={{ marginTop: 24 }}>
        <button style={navButton} onClick={() => setPage("signup")}>
          Sign Up
        </button>
        <button style={navButton} onClick={() => setPage("login")}>
          Log In
        </button>
      </div>
    </div>
  );
}
export default Home;
