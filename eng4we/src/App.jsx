import { useState } from "react";

function App() {
  const [page, setPage] = useState("home");
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div>
      <header
        style={{
          background: "#1976d2",
          padding: "18px 0",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#fff", margin: 0, fontWeight: 700 }}>eng4we</h1>
      </header>
      <nav style={{ margin: 20, textAlign: "center" }}>
        <button style={navButton} onClick={() => setPage("home")}>
          Home
        </button>
        <button style={navButton} onClick={() => setPage("signup")}>
          Sign Up
        </button>
        <button style={navButton} onClick={() => setPage("login")}>
          Log In
        </button>
        <button
          style={navButton}
          onClick={() => setPage("dashboard")}
          disabled={!isLogged}
        >
          Dashboard
        </button>
      </nav>
      {page === "home" && <Home setPage={setPage} />}
      {page === "signup" && (
        <Signup setPage={setPage} setIsLogged={setIsLogged} />
      )}
      {page === "login" && (
        <Login setPage={setPage} setIsLogged={setIsLogged} />
      )}
      {page === "dashboard" && isLogged && (
        <Dashboard setPage={setPage} setIsLogged={setIsLogged} />
      )}
      <footer
        style={{
          background: "#f5f5f5",
          padding: "14px 0",
          textAlign: "center",
          marginTop: 40,
          color: "#888",
        }}
      >
        © {new Date().getFullYear()} eng4we
      </footer>
    </div>
  );
}

export default App;
