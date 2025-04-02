"use client"

import "./globals.css";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This will run only on the client side
  useEffect(() => {
    // Clean up any attributes added by browser extensions
    const body = document.querySelector('body');
    if (body) {
      // Get all attributes
      const attributesToRemove = [];
      for (let i = 0; i < body.attributes.length; i++) {
        const attr = body.attributes[i];
        // Keep only standard attributes like 'class', 'id', etc.
        if (attr.name !== 'class' && attr.name !== 'id' && attr.name !== 'style') {
          attributesToRemove.push(attr.name);
        }
      }

      // Remove the unwanted attributes
      attributesToRemove.forEach(attr => {
        body.removeAttribute(attr);
      });
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
