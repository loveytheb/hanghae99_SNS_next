import type { Metadata } from "next";
import "../globals.css";
import { SideBar } from "@/src/components/common/SideBar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex">
        <main className="flex-1">
          <SideBar />
          {children}
        </main>
      </body>
    </html>
  );
}