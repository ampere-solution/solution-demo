import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {Provider} from "@/components/ui/provider";
import "./globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ampere Cluster Demo",
  description: "Ampere Cluster Demo",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
    <Provider>
      {children}
    </Provider>
    </body>
    </html>
  );
}
