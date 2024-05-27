import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import NextAuthProvider from "@/components/session-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Head from "next/head";

const font = Space_Grotesk({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Scholarly Mind",
  description:
    "Scholarly Mind serves as a virtual tutor and knowledgeable companion, providing assistance and guidance to empower students in unlocking their full potential.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
      <html lang="en" suppressHydrationWarning>
        <Head>
          <title>Scholarly Mind</title>
          <meta
            name="description"
            content="Scholarly Mind serves as a virtual tutor and knowledgeable companion, providing assistance and guidance to empower students in unlocking their full potential."
          />
          <link rel="icon" type="image/png" href="/app/icon.png" />
          <meta property="og:title" content="Scholarly Mind" />
          <meta
            property="og:description"
            content="Scholarly Mind serves as a virtual tutor and knowledgeable companion, providing assistance and guidance to empower students in unlocking their full potential."
          />
          <meta property="og:image" content="app/icon.png" />
          <meta property="og:url" content="https://scholarlymind.com" />
          <meta name="twitter:card" content="summary_large_image" />

          <meta
            name="keywords"
            content="Scholarly Mind, scholarly mind, lifting aspirations to new heights, lift aspirations to new heights, education, academic unpreparedness, AI, ai tutor, AI TUTOR"
          />
          <meta name="robots" content="index, follow" />

          <link rel="nav" href="https://www.scholarlymind.com/register" />
          <link rel="nav" href="https://www.scholarlymind.com/login" />
          <link rel="nav" href="https://www.scholarlymind.com/" />
          <link rel="nav" href="https://www.scholarlymind.com/chat" />
        </Head>
        <body className={`${font.className}`} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="sm:px-10 px-5">{children}</main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </NextAuthProvider>
  );
}
