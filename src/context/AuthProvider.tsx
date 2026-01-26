import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";
import { AuthContext } from "./AuthContext";


export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  clearAuthEvent:() => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  authEvent: "signup" | "signin" | null;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authEvent, setAuthEvent] = useState<"signup" | "signin" | null>(null);

  useEffect(() => {
    // get initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // listen for auth event changes(in future)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession ?? null);
      setUser(newSession?.user ?? null);
      setLoading(false);

      if (event === "SIGNED_IN" && session?.user) {
        // check user initial sing-in tracking (intent flags)
        const recentlySingIn = sessionStorage.getItem("recentlySingIn")
        const recentlySingUp = sessionStorage.getItem("recentlySignUp")

        if (recentlySingIn === 'true') {
          sessionStorage.removeItem("recentlySingIn")
          // check new user or existing user
          const isNewUser = session.user.created_at === session.user.last_sign_in_at
          setAuthEvent(isNewUser ? "signup" : "signin")
        } else if (recentlySingUp === 'true') {
          sessionStorage.removeItem("recentlySignUp")
          setAuthEvent("signup")
        }
      } else if (event === "SIGNED_OUT") {
        setAuthEvent(null);
        const recentlySingOut = sessionStorage.getItem("recentlySignOut")
        if (recentlySingOut === 'true') {
          sessionStorage.removeItem("recentlySignOut")
        }
        setAuthEvent(null)
      }
      else if ((event === "TOKEN_REFRESHED" || event === "USER_UPDATED") && session?.user) {
        const isNewUser = session?.user.created_at === session?.user.last_sign_in_at
        if (isNewUser) {
          setAuthEvent("signup")
        }
      }
    })

    // cleanup fun
    return () => subscription.unsubscribe();

  }, [session?.user]);

  // const signIn = async (email: string, password: string) => {

  const signIn = async (email: string, password: string) => {
  setLoading(true);

  try {
    sessionStorage.setItem("auth_intent", "signin");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      sessionStorage.removeItem("auth_intent");
      throw error;
    }

    if (data.user && !data.user.email_confirmed_at) {
      throw new Error("Email not verified!");
    }

  } catch (err) {
    // handleAuthError(err);
    console.log(err)
    throw err;
  } finally {
    setLoading(false);
  }
// };



    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setLoading(false);
  };

  // login with no password
  // const signInWithMagicLink = async (email: string) => {
  //   setLoading(true);
  //   const { error } = await supabase.auth.signInWithOtp({ email });
  //   if (error) throw error;
  //   setLoading(false);
  // };

  const signOut = async () => {
    setLoading(true);
    sessionStorage.setItem("recentlySignOut", "true")
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setLoading(false);
  };

  const refreshUser = async () => {
    const { data:{session}, error } = await supabase.auth.refreshSession();
    if (error) throw error;
    setSession(session)
    setUser(session?.user ?? null);
  };

  const clearAuthEvent = () =>{
    setAuthEvent(null  )
  }

  const value: AuthContextValue = {
    user,
    session,
    loading,
    signIn,
    signOut,
    refreshUser,
    authEvent,
    clearAuthEvent
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// };