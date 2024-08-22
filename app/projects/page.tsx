import React from "react";
import type { Metadata } from "next";
import PageTransitionLayout from "@/provider/PageTransitionLayout";

export const metadata: Metadata = {
  title: "Projects",
};

export default function Projects() {
  return (
    <PageTransitionLayout>
      <div className="min-h-screen flex justify-center items-center">
        Project page
      </div>
    </PageTransitionLayout>
  );
}
