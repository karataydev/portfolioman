"use client";

import { useState, useEffect } from "react";

import LandingPage from "./_components/landingPage/LandingPage";
import {
  handleGoogleResponse,
  LoginResponse,
} from "./_components/googleAuthData";
import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import MainPage from "./_components/mainPage/MainPage";

export default function Dashboard() {
  const [loginDetails, setLoginDetails] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedLoginDetails = localStorage.getItem("loginDetails");
    if (storedLoginDetails) {
      setLoginDetails(JSON.parse(storedLoginDetails));
    }
    setLoading(false);
  }, []);

  const loginAction = useGoogleLogin({
    onSuccess: (t: TokenResponse) =>
      handleGoogleResponse(t, false, setLoginDetails),
    onError: (error) => console.log("Login Failed:", error),
  });

  const signupAction = useGoogleLogin({
    onSuccess: (t: TokenResponse) =>
      handleGoogleResponse(t, true, setLoginDetails),
    onError: (error) => console.log("Signup Failed:", error),
  });

  const handleLogout = () => {
    localStorage.removeItem("loginDetails");
    setLoginDetails(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loginDetails) {
    return (
      <LandingPage loginAction={loginAction} signupAction={signupAction} />
    );
  }

  return (
    <div>
      <MainPage loginDetails={loginDetails} logoutAction={handleLogout} />
    </div>
  );
}
