import type { Metadata } from "next";
import PageTransitionLayout from "@/provider/PageTransitionLayout";

export const metadata: Metadata = {
  title: "Profile",
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
