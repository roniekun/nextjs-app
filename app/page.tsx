import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-neutral-100 p-[5vw]">
      <Link href="/about"> link to about page</Link>
    </main>
  );
}
