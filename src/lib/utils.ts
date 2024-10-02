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


export function fetchWithBearer(input : any) : Promise<Response> {
  return fetch(input)
}