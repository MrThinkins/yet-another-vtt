import type { Metadata } from "next";
import { Quintessential } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";

const  quintessential = Quintessential({
  weight: '400',
  subsets: ['latin']
})

// const charm = Charm({
//   weight: '400',
//   subsets: ['latin']
// })
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Yet Another VTT",
  description: "Yet Another VTT",
  icons: {
    icon: "/vtt.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      // ${geistSans.variable} ${geistMono.variable}${charm.className}
        className={`${quintessential.className} antialiased`}
      >
        <ClerkProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
