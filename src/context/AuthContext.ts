import { createContext } from "react";
import type { AuthContextValue } from "./AuthProvider";


// global store
export  const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);