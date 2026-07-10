import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

import { AuthInitializer } from "@/components/auth/AuthInitializer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "AkiraHire | AI Recruitment Reimagined",
  description:
    "Sovereign AI agents that source, screen, and schedule top-tier talent.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {


  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Geist:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter text-[14px] overflow-x-hidden min-h-screen flex flex-col bg-black text-white antialiased">
        <AuthInitializer>
          {children}
          <Toaster richColors position="top-right" />
        </AuthInitializer>
      </body>
    </html>
  );
}
