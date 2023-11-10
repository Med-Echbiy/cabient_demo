import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "100", "700"],
});

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
      <body className={roboto.className}>
        <div className="flex min-h-screen ">
          <div className="flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}
