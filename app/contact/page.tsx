import React from "react";
import type { Metadata } from "next";
import { admin } from "@/components/utils/data/admin";
import PageTransitionLayout from "@/provider/PageTransitionLayout";

import Container from "@/components/utils/container";

export const metadata: Metadata = {
  title: `Contact | ${admin.name}`,
};

export default function Contact() {
  return (
    <PageTransitionLayout>
      <div>
        <Container>
          <div className="min-h-screen flex">
            <h1>Contact page</h1>
          </div>
        </Container>
      </div>
    </PageTransitionLayout>
  );
}
