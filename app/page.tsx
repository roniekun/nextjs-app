import PageTransitionLayout from "@/provider/PageTransitionLayout";
import Container from "@/components/util/container";
import Accordion from "@/components/Accordion";
import Hero from "@/components/Hero";
export default function Home() {
  return (
    <PageTransitionLayout>
      <div className="relative flex min-h-screen flex-col w-full items-center">
        <Container className="py-0 flex flex-col items-center justify-center max-w-[1200px]">
          <Hero />
          <Container>
            <Accordion />
          </Container>
        </Container>
      </div>
    </PageTransitionLayout>
  );
}
