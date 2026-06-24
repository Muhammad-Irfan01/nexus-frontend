import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus AI Workspace",
  description: "Premium Enterprise AI SaaS Canvas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <Toaster 
          theme="dark" 
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(23, 31, 51, 0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "#F8FAFC",
              borderRadius: "10px",
              padding: "12px 16px",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5)",
            },
            className: "font-sans text-xs tracking-wide",
          }}
        />
      </body>
    </html>
  );
}
