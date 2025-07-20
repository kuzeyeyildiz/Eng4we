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
  cursor: "pointer"
};

const pageStyle = {
  maxWidth: 400,
  margin: "40px auto",
  background: "#fff",
  borderRadius: 10,
  boxShadow: "0 2px 16px #0002",
  padding: 32,
  textAlign: "center"
};

function Home({ setPage }) {
  return (
    <div style={pageStyle}>
      <h2 style={{ color: "#1976d2" }}>Home</h2>
      <p>Welcome! Please sign up or log in to continue.</p>
      <div style={{ marginTop: 24 }}>
        <button style={navButton} onClick={() => setPage("signup")}>Sign Up</button>
        <button style={navButton} onClick={() => setPage("login")}>Log In</button>
      </div>
    </div>
  );
}

function Signup({ setPage, setIsLogged }) {
  return (
    <div style={pageStyle}>
      <h2 style={{ color: "#1976d2" }}>Sign Up</h2>
      <form style={{ marginTop: 24 }} onSubmit={e => { e.preventDefault(); setIsLogged(true); setPage("dashboard"); }}>
        <input type="text" placeholder="Username" style={{ width: "90%", padding: 8, marginBottom: 12, borderRadius: 4, border: "1px solid #ccc" }} /><br />
        <input type="email" placeholder="Email" style={{ width: "90%", padding: 8, marginBottom: 12, borderRadius: 4, border: "1px solid #ccc" }} /><br />
        <input type="password" placeholder="Password" style={{ width: "90%", padding: 8, marginBottom: 20, borderRadius: 4, border: "1px solid #ccc" }} /><br />
        <button type="submit" style={navButton}>Sign Up</button>
      </form>
      <div style={{ marginTop: 16 }}>
        <button style={{ ...navButton, background: "transparent", color: "#1976d2", boxShadow: "none" }} onClick={() => setPage("login")}>Already have an account? Log In</button>
      </div>
    </div>
  );
}

function Login({ setPage, setIsLogged }) {
  return (
    <div style={pageStyle}>
      <h2 style={{ color: "#1976d2" }}>Log In</h2>
      <form style={{ marginTop: 24 }} onSubmit={e => { e.preventDefault(); setIsLogged(true); setPage("dashboard"); }}>
        <input type="email" placeholder="Email" style={{ width: "90%", padding: 8, marginBottom: 12, borderRadius: 4, border: "1px solid #ccc" }} /><br />
        <input type="password" placeholder="Password" style={{ width: "90%", padding: 8, marginBottom: 20, borderRadius: 4, border: "1px solid #ccc" }} /><br />
        <button type="submit" style={navButton}>Log In</button>
      </form>
      <div style={{ marginTop: 16 }}>
        <button style={{ ...navButton, background: "transparent", color: "#1976d2", boxShadow: "none" }} onClick={() => setPage("signup")}>Don't have an account? Sign Up</button>
      </div>
    </div>
  );
}

function Dashboard({ setPage, setIsLogged }) {
  return (
    <div style={pageStyle}>
      <h2 style={{ color: "#1976d2" }}>Dashboard</h2>
      <p>Welcome, user!</p>
      <button style={navButton} onClick={() => { setIsLogged(false); setPage("home"); }}>Log Out</button>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div>
      <header style={{ background: "#1976d2", padding: "18px 0", textAlign: "center" }}>
        <h1 style={{ color: "#fff", margin: 0, fontWeight: 700 }}>eng4we</h1>
      </header>
      <nav style={{ margin: 20, textAlign: "center" }}>
        <button style={navButton} onClick={() => setPage("home")}>Home</button>
        <button style={navButton} onClick={() => setPage("signup")}>Sign Up</button>
        <button style={navButton} onClick={() => setPage("login")}>Log In</button>
        <button style={navButton} onClick={() => setPage("dashboard")} disabled={!isLogged}>Dashboard</button>
      </nav>
      {page === "home" && <Home setPage={setPage} />}
      {page === "signup" && <Signup setPage={setPage} setIsLogged={setIsLogged} />}
      {page === "login" && <Login setPage={setPage} setIsLogged={setIsLogged} />}
      {page === "dashboard" && isLogged && <Dashboard setPage={setPage} setIsLogged={setIsLogged} />}
      <footer style={{ background: "#f5f5f5", padding: "14px 0", textAlign: "center", marginTop: 40, color: "#888" }}>
        © {new Date().getFullYear()} eng4we
      </footer>
    </div>
  );
}

export default App;