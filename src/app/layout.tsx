import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Mono, Caveat } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReviewModeBanner } from "@/components/review-mode-banner";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Design Engineering for UX Designers",
  description: "Learn to build with AI — a 5-phase course for UX designers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${spaceMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider>{children}</TooltipProvider>
        <ReviewModeBanner />
      </body>
    </html>
  );
}
