import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/layout/footer";
import { AuthSessionProvider } from "@/components/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pixie-link.vercel.app"),
  title: {
    default: "Pixie - Shorten & manage your links easily",
    template: "%s | Pixie",
  },
  manifest: "/manifest.json",
  description: "Pixie is a minimal and modern open-source URL shortener.",
  icons: [
    {
      rel: "icon",
      type: "image/svg+xml",
      sizes: "any",
      url: "/images/favicon.svg",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "180x180",
      url: "/images/apple-touch-icon.png",
    },
  ],
  openGraph: {
    title: "Pixie",
    description: "A minimal and modern open-source URL shortener",
    url: "https://pixie-link.vercel.app",
    siteName: "Pixie",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pixie Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Pixie - A minimal open-source URL shortener",
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-900`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthSessionProvider>
            <Header />
            <main className="flex flex-col bg-white dark:bg-slate-950 items-center min-h-[calc(100vh-8.2rem)] gap-6 pt-6 font-[family-name:var(--font-geist-sans)]">
              {children}
            </main>
            <Footer />
            <Toaster />
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
