import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth.context";
import type { AuthContextValue, AuthService, User } from "../../shared/types/auth";

interface AuthProviderProps {
  children: React.ReactNode;
  authService: AuthService;
}

export function AuthProvider({ children, authService }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [authService]);

  const sendEmail = async (email: string) => {
    setIsLoading(true);
    try {
      const result = await authService.sendEmail({ email });
      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Send email failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const sendCode = async (email: string, code: string) => {
    setIsLoading(true);
    try {
      const result = await authService.sendCode({ email, code });

      if (result.success && result.user) {
        setUser(result.user);
      }

      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Code verification failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      sendEmail,
      sendCode,
      logout,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
