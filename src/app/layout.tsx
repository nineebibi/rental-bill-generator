import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rental Receipt Generator",
  description: "Simple bill generator for rental rooms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        {/* Font loaded via globals.css */}
      </head>
      <body className="font-sarabun antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
