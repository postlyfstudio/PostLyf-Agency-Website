import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import SmoothScroll from "../components/SmoothScroll";

export const metadata = {
  title: "Video Production & Digital Agency in Pune | PostLfy",
  description:
    "Premium video production, web development, and social media marketing agency in Pune helping brands build high-performance digital growth systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#050505] text-white overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "PostLfy Studio",
              url: "https://postlyf.com/",
              logo: "https://postlyf.com/logo.png",
              telephone: "+91-9226719090",
              areaServed: "Worldwide",
              hasMap: "https://maps.app.goo.gl/6hRv47gKYBLvAU218",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pune",
                addressRegion: "Maharashtra",
                addressCountry: "India"
              },
              sameAs: [
                "https://www.instagram.com/postlyfstudio/",
                "https://www.linkedin.com/company/postlyf-studio/",
                "https://www.facebook.com/people/Postlyf-Studio/61572633339649/"
              ],
              serviceType: [
                "Video Production",
                "Web Development",
                "Social Media Marketing"
              ]
            })
          }}
        />
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>

      <meta name="google-site-verification" content="SJTMkWcWW-S46aXZLaaOEVF6OWqTcgdkqnidHHBG4Bc" />
    </html>
  );
}
