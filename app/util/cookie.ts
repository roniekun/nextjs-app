import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export function getThemeCookie(req: NextApiRequest) {
  const cookies = cookie.parse(req ? req.headers.cookie || "" : "");
  return cookies.theme || "light"; // Default to 'light' theme if no cookie
}

export function setThemeCookie(res: NextApiResponse, theme: string) {
  const serializedCookie = cookie.serialize("theme", theme, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
  res.setHeader("Set-Cookie", serializedCookie);
}
