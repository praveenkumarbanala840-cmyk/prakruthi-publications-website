import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyBottomCTA from "@/components/layout/StickyBottomCTA";
import { siteConfig, visibleExams } from "@/lib/site-config";
import "./globals.css";

function examListText() {
  const names = visibleExams.map((exam) => exam.shortName);
  return names.length <= 1 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-display",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

const homeDescription = `Prakruthi Publications offers expert coaching for ${examListText()} government exams in Andhra Pradesh and Telangana, with 8+ years of experience and 1000+ students selected.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Prakruthi Publications — AP TET, AP DSC & Government Exam Coaching",
    template: "%s | Prakruthi Publications",
  },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Prakruthi Publications — AP TET, AP DSC & Government Exam Coaching",
    description: homeDescription,
    url: "/",
    siteName: siteConfig.name,
    images: [{ url: "/og/share.png", width: 1200, height: 630, alt: siteConfig.name }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prakruthi Publications — AP TET, AP DSC & Government Exam Coaching",
    description: homeDescription,
    images: ["/og/share.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-charcoal">
        <div className="scroll-progress" aria-hidden="true" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyBottomCTA />
      </body>
    </html>
  );
}
