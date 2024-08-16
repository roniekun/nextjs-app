import SignIn from "@/components/SignIn";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-neutral-100 p-[5vw]">
      <div className="relative flex flex-col">
        <h1 className="text-4xl font-bold self-center">
          Discover great artists in your region
        </h1>
      </div>
      <SignIn />
    </main>
  );
}
