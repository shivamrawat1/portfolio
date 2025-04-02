"use client"

import { useEffect } from "react";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
        <>
            {children}
        </>
    );
} 