import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentKit demo",
  description: "Demo of ChatKit with hosted workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          strategy="beforeInteractive"
          onLoad={() => {
            console.log("ChatKit script loaded successfully");
          }}
          onError={(e) => {
            console.error("Failed to load ChatKit script", e);
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
