import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider"; // 1. Import our provider wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeaveFlow",
  description: "Manage leave requests efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. Wrap everything inside the body with AuthProvider */}
        <AuthProvider>
          <Navbar />
          <div className="min-h-screen bg-slate-50">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}