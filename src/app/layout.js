import TopNav from "@/components/TopNav";
import "./globals.css";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Footer";
import FooterComp from "@/components/FooterComp";
import { Toaster } from "@/components/ui/toaster";
import StickyNav from "@/components/StickyNav";

export const metadata = {
  title: "AlilalsAgrico",
  description: "Generated by create next app",
};

const appFont = {
  fontFamily: "Inter, sans-serif", // Replace with your desired font family
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={appFont}>
      <body>
        <StickyNav />
        <TopNav />
        <Nav />
        {children}
        <FooterComp />
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
