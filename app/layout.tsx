import type { Metadata } from "next";
import "./globals.css";
import LocalProvider from "@/provider/LocalProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieModal from "@/components/modal/cookie";
import Navbar from "@/components/layout/Navbar";
import Banner from "@/components/layout/Banner";
import Search from "@/components/common/Search";
import { contentData } from "@/data/content-data";
import ClientProvider from "@/provider/ClientProvider";
import { useAppSelector } from "@/store/hooks/hooks";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Ronie Benitez",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useAppSelector((state) => state.theme);
  useEffect(() => {
    document.body.setAttribute("theme", theme);
  }, []);

  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <LocalProvider>
            <main
              className="flex flex-col p-0"
              style={{ fontFamily: "Mori, sans-serif" }}
            >
              <Banner />
              <Header />
              <Navbar />
              {children}
              <CookieModal />
              <Footer />
              <Search placeholder="Search..." contentData={contentData} />
            </main>
          </LocalProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
