import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Track real-time stock",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
