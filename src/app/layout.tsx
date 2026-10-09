import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyBottomCTA from "@/components/layout/StickyBottomCTA";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-display",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "Prakruthi Publications — AP TET, AP DSC & Government Exam Coaching",
    template: "%s | Prakruthi Publications",
  },
  description:
    "Prakruthi Publications offers expert coaching for AP TET, AP DSC, HWO and APSET government exams in Andhra Pradesh, with 8+ years of experience and 1000+ students selected.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-charcoal">
        <Header />
        <main className="flex-1 pb-16">{children}</main>
        <Footer />
        <StickyBottomCTA />
      </body>
    </html>
  );
}
