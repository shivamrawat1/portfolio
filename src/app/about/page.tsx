"use client";

import { useContent } from "../context/ContentContext";

export default function About() {
    const { content, isLoading } = useContent();

    if (isLoading) {
        return (
            <div className="container mx-auto py-16 px-4 text-center">
                <p>Loading content...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-16 px-4 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8 text-center">About</h1>

            <div className="prose max-w-none opacity-80 leading-relaxed">
                {content.about.paragraphs.map((paragraph, index) => (
                    <p key={index} className="mb-4">
                        {paragraph}
                    </p>
                ))}
            </div>
        </div>
    );
}
