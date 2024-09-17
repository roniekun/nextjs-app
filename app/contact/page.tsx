import React from "react";
import type { Metadata } from "next";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
import { admin } from "@/data/admin-data";

import Container from "@/components/libs/ui/container";

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
