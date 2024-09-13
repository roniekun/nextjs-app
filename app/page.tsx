"use client";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
import Container from "@/components/utils/container";
import Accordion from "@/components/Accordion";
import Hero from "@/components/Hero";
import SearchBar from "@/components/utils/search";

export default function Home() {
  return (
    <PageTransitionLayout>
      <div className="relative flex min-h-screen flex-col w-full items-center">
        <Container className="py-0 flex flex-col items-center justify-center max-w-[1200px]">
          <Hero />
          <Accordion />
        </Container>
        <div>
          <SearchBar />
        </div>
      </div>
    </PageTransitionLayout>
  );
}
