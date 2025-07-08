import { createContext } from "react";
import type { AuthContextValue } from "../../shared/types/auth";

export const AuthContext = createContext<AuthContextValue | null>(null);
