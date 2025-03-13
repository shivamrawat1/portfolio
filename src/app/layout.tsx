import "./globals.css";
import Navigation from "./components/navigation";
import { Providers } from "./providers";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/* Inline script to set the theme before page load to prevent flash */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme) {
                  document.documentElement.classList.add(savedTheme);
                } else {
                  document.documentElement.classList.add('teal');
                }
              } catch (e) {
                document.documentElement.classList.add('teal');
              }
            })();
          `
        }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <div className="pattern-container"></div>
        <Providers>
          <header className="py-6 border-b border-opacity-20 border-accent">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center">
                <Navigation />
              </div>
            </div>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="py-6 border-t border-opacity-20 border-accent text-center">
            <div className="container mx-auto px-4">
              <p className="text-sm opacity-70">© 2023 Portfolio. All rights reserved.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
