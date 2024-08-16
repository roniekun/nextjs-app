import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <div className="p-[5vw] min-h-screen">
      <h1>about page</h1>
    </div>
  );
}
