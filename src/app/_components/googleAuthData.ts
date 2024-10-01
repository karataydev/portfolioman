import { TokenResponse } from "@react-oauth/google";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  google_id: string;
  profile_picture_url: string;
}

export async function handleGoogleResponse(
  tokenResponse: TokenResponse,
  isSignUp: boolean,
  setUser: (user: User | null) => void,
) {
  console.log("Google Token:", tokenResponse);

  const endpoint = isSignUp
    ? "http://localhost:8080/api/auth/signup"
    : "http://localhost:8080/api/auth/signin";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ google_token: tokenResponse.access_token }),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("auth_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      console.error("Authentication failed");
    }
  } catch (error) {
    console.error("Error during authentication:", error);
  }
}
