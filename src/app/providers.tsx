"use client";

import { ReactNode } from "react";
import { ContentProvider } from "./context/ContentContext";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ContentProvider>
            {children}
        </ContentProvider>
    );
} 