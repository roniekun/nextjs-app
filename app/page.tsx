import SignIn from "@/components/SignIn";
import Container from "@/components/Container";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col w-full items-center">
      <Container className="flex items-center justify-between max-w-[1200px]">
        <div className="relative flex flex-col">
          <h1 className="text-4xl font-bold self-center">
            Discover great artists in your region
          </h1>
        </div>
        <SignIn />
      </Container>
    </main>
  );
}
