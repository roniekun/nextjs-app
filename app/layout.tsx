import type { Metadata } from "next";
import "./store/styles/globals.css";
import LocalProvider from "@/provider/LocalProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieModal from "@/components/modal/cookie";
import Navbar from "@/components/layout/Navbar";
import Banner from "@/components/layout/Banner";
import Search from "@/components/common/Search";
import { contentData } from "@/data/content-data";
import store from "@/store/store";
import { Provider } from "react-redux";

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
        <Provider store={store}>
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
        </Provider>
      </body>
    </html>
  );
}
