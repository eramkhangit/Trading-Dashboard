import React, { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  // signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// global store
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    // to user info at first load
    refreshUser().catch(console.error);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // const signUp = async ({
  //   email: string,
  //   password: string,
  //   option: {
  //     data: { name: string },
  //   },
  // }) => {
  //   setLoading(true);
  //   try {
  //     const { error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         data: {
  //           name,
  //         },
  //       },
  //     });
  //     refreshUser().catch(console.error);
  //     if (error) throw error;
  //   } catch (error) {
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    refreshUser().catch(console.error);
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
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setLoading(false);
  };

  const refreshUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    setUser(data.user ?? null);
  };

  const value: AuthContextValue = {
    user,
    session,
    loading,
    // signUp,
    signIn,
    signOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
