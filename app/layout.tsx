import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatbotWidget from "@/components/ChatbotWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IP-SAKTI Sahayak | Ayurvedic IPR & Regulatory Evaluation Engine",
  description: "Statutory compliance and patent classification system under Patents Act 1970 and BDA 2024.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <ChatbotWidget />
      </body>
    </html>
  );
}