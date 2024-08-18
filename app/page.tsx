import Container from "@/components/util/container";
import Accordion from "@/components/Accordion";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col w-full items-center">
      <Container className="flex flex-col items-center justify-center max-w-[1200px]">
        <div className="relative flex flex-col">
          <h1 className="text-4xl font-bold self-center">
            Discover great artists in your region
          </h1>
        </div>
        <Container>
          <Accordion />
        </Container>
      </Container>
    </main>
  );
}
