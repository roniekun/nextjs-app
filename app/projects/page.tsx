import React from "react";
import type { Metadata } from "next";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
import { admin } from "@/components/utils/data/admin";

export const metadata: Metadata = {
  title: `Projects | ${admin.name}`,
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
