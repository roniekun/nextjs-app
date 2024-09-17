import type { Metadata } from "next";
import { admin } from "@/data/admin-data";
import PageTransitionLayout from "@/provider/PageTransitionLayout";

export const metadata: Metadata = {
  title: `Profile | ${admin.name}`,
};
export default function Profile() {
  return (
    <PageTransitionLayout>
      <div className="min-h-screen flex justify-center items-center">
        Profile
      </div>
    </PageTransitionLayout>
  );
}
