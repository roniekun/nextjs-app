import type { Metadata } from "next";
import Link from "next/link";
import { GrHomeRounded } from "react-icons/gr";

export const metadata: Metadata = {
  title: "Page not found.",
  description: "This is an error.",
};

export default function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl font-semibold">Opps!</h1>
      <h2 className="text-xl">Page could not be found.</h2>
      <br />

      <div className="text-sm text-neutral-500 hover:text-blue-500 flex flex-col justify-center items-center">
        <GrHomeRounded /> <Link href="/"> Return to home</Link>
      </div>
    </div>
  );
}
