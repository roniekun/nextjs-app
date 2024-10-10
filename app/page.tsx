"use client";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
import Container from "@/components/lib/ui/container";
import Hero from "@/components/common/Hero";
import Accordion from "@/components/features/accordion/Accordion";

export default function Home() {
  return (
    <PageTransitionLayout>
      <div className="relative flex min-h-screen flex-col w-screen items-center">
        <Container className="py-0 flex flex-col items-center justify-center max-w-[1400px]">
          <Hero />
          <Accordion />
        </Container>
      </div>
    </PageTransitionLayout>
  );
}
