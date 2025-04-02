"use client"

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: React.ReactNode;
}

export default function Portal({ children }: PortalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Create a portal container if it doesn't exist
    useEffect(() => {
        if (!document.getElementById('portal-root')) {
            const portalRoot = document.createElement('div');
            portalRoot.id = 'portal-root';
            portalRoot.style.position = 'fixed';
            portalRoot.style.zIndex = '9999';
            portalRoot.style.top = '0';
            portalRoot.style.left = '0';
            portalRoot.style.width = '100%';
            portalRoot.style.height = '100%';
            portalRoot.style.pointerEvents = 'none';
            document.body.appendChild(portalRoot);
        }
    }, []);

    return mounted && document.getElementById('portal-root')
        ? createPortal(children, document.getElementById('portal-root')!)
        : null;
} 