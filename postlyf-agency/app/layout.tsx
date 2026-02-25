import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import SmoothScroll from "../components/SmoothScroll";

export const metadata: Metadata = {
  title: "Postlyf | Premium Digital Agency",
  description: "High-end Video Editing and Web Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#050505] text-white overflow-x-hidden">
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}