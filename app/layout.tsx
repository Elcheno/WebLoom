import { urbanist } from "./ui/fonts";
import "./globals.css";
import NavBar from "./ui/nav-bar";
import { Toaster } from 'sonner'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {  
  return (
  <html lang="en" className={urbanist.className}>
    <body className="bg-background text-foreground">
      <main className="min-h-screen flex flex-col items-center">
        <NavBar />
        { children }
        <Toaster position="bottom-center" />
      </main>
    </body>
  </html>
  );
}
