import React from "react";
import type { Metadata } from "next";
import Container from "@/components/util/container";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <Container>
      <div className="min-h-screen flex">
        <h1>Contact page</h1>
      </div>
    </Container>
  );
}
