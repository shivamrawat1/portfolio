"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContent } from "../../context/ContentContext";
import PlaceholderImage from "../../components/placeholder-image";
import { useParams } from "next/navigation";

export default function ProjectDetail() {
    const { content, isLoading } = useContent();
    const [isClient, setIsClient] = useState(false);
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (isLoading || !isClient) {
        return (
            <div className="container mx-auto py-16 px-4 text-center">
                <p>Loading project details...</p>
            </div>
        );
    }

    const project = content.projects.find(p => p.id === id);

    if (!project) {
        return (
            <div className="container mx-auto py-16 px-4 text-center">
                <h1 className="text-3xl font-bold mb-8">Project Not Found</h1>
                <p className="mb-8">The project you're looking for doesn't exist.</p>
                <Link href="/projects" className="btn">
                    Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-16 px-4">
            <Link href="/projects" className="opacity-70 hover:opacity-100 mb-8 inline-block">
                ← Back to Projects
            </Link>

            <div className="max-w-4xl mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-6">{project.title}</h1>

                <div className="mb-12 h-96 relative">
                    {project.imageUrl ? (
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover rounded-lg"
                        />
                    ) : (
                        <PlaceholderImage height={400} alt={project.title} />
                    )}
                </div>

                <div className="prose max-w-none opacity-80 mb-12">
                    <p className="mb-6">{project.description}</p>
                    {project.fullDescription && <p>{project.fullDescription}</p>}
                </div>

                {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-xl font-medium mb-4">Technologies Used</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-accent bg-opacity-10 rounded-full text-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 