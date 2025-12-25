import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";


const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EvalyAI",
  description: "EvalyAI is an AI-powered interview and candidate evaluation platform designed to help companies hire faster and smarter.It automates interviews, analyzes candidate skills, communication, and behavior, and provides clear hiring insights in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.className} antialiased pattern`}
      >
        {children}

        <Toaster />
      </body>
    </html>
  );
}
