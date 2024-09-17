import type { Metadata } from "next";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
import { admin } from "@/data/admin-data";

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
