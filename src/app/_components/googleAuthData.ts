import { TokenResponse } from "@react-oauth/google";

export interface LoginResponse {
  user: User;
  access_token: string;
}


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
  setLoginDetails: (loginDetails: LoginResponse | null) => void,
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
      setLoginDetails(data);
      localStorage.setItem("loginDetails", JSON.stringify(data));
    } else {
      console.error("Authentication failed");
    }
  } catch (error) {
    console.error("Error during authentication:", error);
  }
}
