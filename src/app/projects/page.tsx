"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PlaceholderImage from "../components/placeholder-image";
import { useContent } from "../context/ContentContext";

export default function Projects() {
    const { content, isLoading } = useContent();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (isLoading || !isClient) {
        return (
            <div className="container mx-auto py-16 px-4 text-center">
                <p>Loading projects...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold mb-12 text-center">Projects</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.projects.map((project) => (
                    <Link href={project.link} key={project.id} className="card hover:shadow-lg transition-shadow">
                        <div className="image-container h-48 relative overflow-hidden">
                            {project.imageUrl ? (
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <PlaceholderImage height={200} alt={project.title} />
                            )}
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-medium mb-2">{project.title}</h3>
                            <p className="opacity-80">{project.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
} 