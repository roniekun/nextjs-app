"use client";
import Link from "next/link";
import Container from "./container";
import { useLayout } from "@/provider/context/LayoutContext";

const Logo = () => {
  const { isMobile } = useLayout();
  return (
    <Container className="p-0 m-1 font-medium uppercase">
      {isMobile ? (
        <Link href="/">
          R<br /> B
        </Link>
      ) : (
        <Link href="/">
          RONIE
          <br /> BENITEZ
        </Link>
      )}
    </Container>
  );
};

export default Logo;
