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

function Login({ setPage, setIsLogged }) {
  return (
    <div style={pageStyle}>
      <h2 style={{ color: "#1976d2" }}>Log In</h2>
      <form
        style={{ marginTop: 24 }}
        onSubmit={(e) => {
          e.preventDefault();
          setIsLogged(true);
          setPage("dashboard");
        }}
      >
        <input
          type="email"
          placeholder="Email"
          style={{
            width: "90%",
            padding: 8,
            marginBottom: 12,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          style={{
            width: "90%",
            padding: 8,
            marginBottom: 20,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />
        <br />
        <button type="submit" style={navButton}>
          Log In
        </button>
      </form>
      <div style={{ marginTop: 16 }}>
        <button
          style={{
            ...navButton,
            background: "transparent",
            color: "#1976d2",
            boxShadow: "none",
          }}
          onClick={() => setPage("signup")}
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
}
export default Login;
