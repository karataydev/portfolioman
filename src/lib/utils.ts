import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
};

export const calculatePercentage = (value: number, initialValue: number) => {
  return ((value - initialValue) / initialValue) * 100;
};

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function fetchWithBearer(input: any): Promise<Response> {
  return fetch(input);
}

export interface ApiResponse<T = any> {
  data: T | null;
  error: string | null;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiFetchOptions extends Omit<RequestInit, "method" | "body"> {
  method?: HttpMethod;
  body?: object;
  useCustomUrl: boolean;
}

async function getAuthToken(): Promise<string | null> {
  const storedLoginDetails = localStorage.getItem("loginDetails");
  if (!storedLoginDetails) return null;
  return JSON.parse(storedLoginDetails).access_token;
}

export async function apiFetch<T = any>(
  input: RequestInfo,
  options: ApiFetchOptions = {
    useCustomUrl: false,
  },
): Promise<ApiResponse<T>> {
  try {
    const serverUrl = "http://localhost:8080";
    if (!options.useCustomUrl) {
      input = serverUrl + input;
    }
    console.log("BreakPoint1");

    const token = await getAuthToken();

    const headers = new Headers(options.headers || {});
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    // If it's not GET and there's a body, stringify it and set content type
    if (options.method && options.method !== "GET" && options.body) {
      headers.set("Content-Type", "application/json");
    }

    const config: RequestInit = {
      ...options,
      headers,
      method: options.method || "GET",
    };

    // Only add body for non-GET requests
    if (options.method && options.method !== "GET" && options.body) {
      config.body = JSON.stringify(options.body);
    }

    const response = await fetch(input, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("API request failed:", error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
