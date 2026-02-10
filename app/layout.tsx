import "../globals.css";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "AI Triage - Smart Support Ticket Management",
  description: "AI-powered support ticket triage system that automatically categorizes, prioritizes, and drafts responses for your support tickets.",
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground font-sans">
        <Navbar />
        <div className="mx-auto max-w-6xl px-6">{children}</div>
      </body>
    </html>
  );
}
