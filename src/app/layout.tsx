import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "./_components/layout/navbar";
import Footer from "./_components/layout/footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Riddle",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="antialiased max-h-screen  max-w-xl mx-4 mt-8 lg:mx-auto bg-black text-white">
          <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0 ">
            <Navbar></Navbar>
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Footer></Footer>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
