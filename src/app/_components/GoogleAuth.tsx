"use client";
import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { User, handleGoogleResponse } from "./googleAuthData";

export function GoogleAuth({}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginAction = useGoogleLogin({
    onSuccess: (t: TokenResponse) => handleGoogleResponse(t, false, setUser),
    onError: (error) => console.log("Login Failed:", error),
  });

  const signupAction = useGoogleLogin({
    onSuccess: (t: TokenResponse) => handleGoogleResponse(t, true, setUser),
    onError: (error) => console.log("Signup Failed:", error),
  });

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");

    setUser(null);
  };

  if (user) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => loginAction()}>Sign in with Google</button>

      <button onClick={() => signupAction()}>Sign up with Google</button>
    </div>
  );
}
