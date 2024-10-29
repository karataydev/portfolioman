import { TokenResponse } from "@react-oauth/google";
import { apiFetch } from "@/lib/utils";

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

  const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/signin";

  const { data, error } = await apiFetch(endpoint, {
    method: "POST",
    body: { google_token: tokenResponse.access_token },
  });

  if (error) {
    console.error("Error during authentication:", error);
    return;
  }
  setLoginDetails(data);
  localStorage.setItem("loginDetails", JSON.stringify(data));
}
