"use client";

import { useId } from "react";

interface PlaceholderImageProps {
    width?: number;
    height?: number;
    className?: string;
    alt?: string;
}

export default function PlaceholderImage({
    width = 400,
    height = 300,
    className = "",
    alt = "Placeholder image"
}: PlaceholderImageProps) {
    const id = useId();

    return (
        <div
            className={`relative flex items-center justify-center bg-accent bg-opacity-10 overflow-hidden ${className}`}
            style={{ width, height }}
            role="img"
            aria-label={alt}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id={`placeholder-pattern-${id}`}
                        patternUnits="userSpaceOnUse"
                        width="20"
                        height="20"
                        patternTransform="rotate(45)"
                    >
                        <line
                            x1="0"
                            y="0"
                            x2="0"
                            y2="20"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeOpacity="0.2"
                        />
                    </pattern>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    fill={`url(#placeholder-pattern-${id})`}
                />
                <rect
                    x="25"
                    y="35"
                    width="50"
                    height="30"
                    rx="5"
                    fill="var(--background)"
                    fillOpacity="0.8"
                />
                <text
                    x="50"
                    y="55"
                    fontFamily="sans-serif"
                    fontSize="8"
                    textAnchor="middle"
                    fill="currentColor"
                >
                    {alt}
                </text>
            </svg>
        </div>
    );
} 