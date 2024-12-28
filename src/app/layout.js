import TopNav from "@/components/TopNav";
import "./globals.css";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { SuccessDialogProvider } from "@/context/DialogContext";
import { AlertProvider } from "@/context/AlertContext";
import { StatsProvider } from "@/context/StatContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { BlogsProvider } from "@/context/BlogContext";

export const metadata = {
  title: "Alilals Agrico - Best Orchard Service Provider in Jammu and Kashmir",
  description:
    "Alilals Agrico, based in Jammu and Kashmir, revolutionizes Indian agriculture with sustainable practices and farmer empowerment. Specializing in high-density orchards, precision farming, and eco-friendly innovations, we uplift rural communities and modernize traditional farming. Through our flagship brand AASH and initiatives like ZIRAAT, we deliver excellence in orchard care, fertilizers, and plant nutrition, ensuring optimized yields and minimized environmental impact. Join us in creating a sustainable agricultural future that harmonizes innovation and tradition for long-term prosperity.",
};

const appFont = {
  fontFamily: "Inter, sans-serif", // Replace with your desired font family
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={appFont}>
      <body>
        <AlertProvider>
          <StatsProvider>
            <ProjectProvider>
              <BlogsProvider>
                <SuccessDialogProvider>
                  <TopNav />
                  <Nav />
                  {children}
                  <Footer />
                  <Toaster />
                </SuccessDialogProvider>
              </BlogsProvider>
            </ProjectProvider>
          </StatsProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
