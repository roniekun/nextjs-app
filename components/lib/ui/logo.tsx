"use client";
import { DataContext } from "@/provider/context/DataContext";
import Link from "next/link";
import { useContext } from "react";
import Container from "./container";

const Logo = () => {
  const { isToggleMenu } = useContext(DataContext);
  return (
    <>
      <Container className="p-0">
        {!isToggleMenu && (
          <Link href="/" className="m-1 font-medium">
            Ronie Benitez
          </Link>
        )}
      </Container>
    </>
  );
};

export default Logo;
