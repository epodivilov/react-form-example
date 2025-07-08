import { LoginPage, HomePage } from "../pages";
import { AuthProvider, MockAuthService, useAuth } from "../features/auth";
import classes from "./app.module.css";

const authService = new MockAuthService();

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <HomePage />;
}

export function App() {
  return (
    <AuthProvider authService={authService}>
      <div className={classes.root}>
        <AppContent />
      </div>
    </AuthProvider>
  );
}
