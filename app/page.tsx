"use client";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
import Container from "@/app/components/lib/ui/container";
import Hero from "@/app/components/common/Hero";
import Accordion2 from "@/app/components/features/accordion/Accordion2";
import { NextApiRequest } from "next";
import { getThemeCookie } from "./util/cookie";

export default function Home() {
  return (
    <PageTransitionLayout>
      <div className="relative flex min-h-screen flex-col w-screen items-center">
        <Container className="py-0 flex flex-col items-center justify-center max-w-[1400px]">
          <Hero />
          <Accordion2 />
        </Container>
      </div>
    </PageTransitionLayout>
  );
}
