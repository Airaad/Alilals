import TopNav from "@/components/TopNav";
import "./globals.css";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Footer";


export const metadata = {
  title: "AlilalsAgrico",
  description: "Generated by create next app",
};

const appFont = {
  fontFamily: 'Inter, sans-serif', // Replace with your desired font family
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={appFont}>
      <body>
      <TopNav/>
      <Nav/>
        {children}
      <Footer/>
      </body>
    </html>
  );
}