import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "clinic",
  description: "a clinic doctor managment system ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="corporate">
      <body className={inter.className}>
        <div className="flex  min-h-screen ">
          <div className="flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}
