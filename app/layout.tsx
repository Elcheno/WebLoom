import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner'
import { GeistSans } from "geist/font/sans";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "WebLoom",
  description: "Description of the WebLoom project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          { children }
          <Toaster position="bottom-center" />
        </main>
      </body>
    </html>
  );
}
