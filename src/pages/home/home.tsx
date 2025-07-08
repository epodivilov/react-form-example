import { useAuth } from "../../features/auth";

export function HomePage() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>Welcome, {user?.name || "User"}!</h1>
        <button onClick={handleLogout} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
          Logout
        </button>
      </header>
      <main>
        <p>You are successfully logged in!</p>
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
          }}
        >
          <h3>Protected Content</h3>
          <p>This content is only visible to authenticated users.</p>
        </div>
      </main>
    </div>
  );
}
