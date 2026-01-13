import type { Metadata } from "next";
import "./globals.css";
import Footer from "./_components/footer/Footer"; 
import { Open_Sans } from "next/font/google";
import Header from "./_components/header/Header";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tyre Sales",
  description: "Tyre sales website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className}`}
      >
       <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
