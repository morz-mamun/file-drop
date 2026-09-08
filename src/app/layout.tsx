import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "File-Drop",
  description: "A simple and fast web app to upload files and get instant shareable URLs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-canvas">
        <AuthProvider>
          <Toaster position="top-center" richColors />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
