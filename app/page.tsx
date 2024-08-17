import SignIn from "@/components/SignIn";
import Container from "@/components/Container";

export default function Home() {
  return (
    <Container className="bg-neutral-50">
      <main className="relative flex min-h-screen flex-col">
        <div className="relative flex flex-col">
          <h1 className="text-4xl font-bold self-center">
            Discover great artists in your region
          </h1>
        </div>
        <SignIn />
      </main>
    </Container>
  );
}
