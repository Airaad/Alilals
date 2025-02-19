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
import { Playfair_Display, Roboto } from "@next/font/google";
import { AppleProvider } from "@/context/AppleContext";

export const metadata = {
  title: "Alilals Agrico | Best Orchard Service Provider",
  description:
    "Alilals Agrico, based in Jammu and Kashmir, revolutionizes Indian agriculture with sustainable practices and farmer empowerment. Specializing in high-density orchards, precision farming, and eco-friendly innovations, we uplift rural communities and modernize traditional farming.",
};

// Define fonts using @next/font/google
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${roboto.className}`}
      style={{
        "--font-heading": roboto.style.fontFamily,
        "--font-body": roboto.style.fontFamily,
      }}
    >
      <body>
        <AlertProvider>
          <StatsProvider>
            <ProjectProvider>
              <AppleProvider>
                <BlogsProvider>
                  <SuccessDialogProvider>
                    <TopNav />
                    <Nav />
                    {children}
                    <Footer />
                    <Toaster />
                  </SuccessDialogProvider>
                </BlogsProvider>
              </AppleProvider>
            </ProjectProvider>
          </StatsProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
