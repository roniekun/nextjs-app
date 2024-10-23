import type { Metadata } from "next";
import "./globals.css";
import LocalProvider from "@/provider/LocalProvider";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import CookieModal from "@/app/components/modal/cookie";
import Navbar from "@/app/components/layout/Navbar";
import Banner from "@/app/components/layout/Banner";
import Search from "@/app/components/common/Search";
import { contentData } from "@/data/content-data";
import ClientProvider from "@/provider/ClientProvider";

export const metadata: Metadata = {
  title: "Ronie Benitez",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
