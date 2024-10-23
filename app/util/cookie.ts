import cookie from "cookie"; // For serializing cookies
import { NextResponse } from "next/server"; // For setting cookies
import { cookies as getRequestCookies } from "next/headers"; // For accessing cookies in server components

// Function to get the theme cookie from the request cookies
export function getThemeCookie(): string {
  const cookies = getRequestCookies(); // Get the ReadonlyRequestCookies instance
  const themeCookie = cookies.get("theme"); // Access the theme cookie
  return themeCookie ? themeCookie.value : "light"; // Default to 'light' theme if no cookie
}

// Function to set the theme cookie in the response
export function setThemeCookie(theme: string): NextResponse {
  const response = NextResponse.next();
  const serializedCookie = cookie.serialize("theme", theme, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  response.cookies.set("theme", serializedCookie); // Set the cookie in the response
  return response;
}
