"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PlaceholderImage from "../components/placeholder-image";

// Sample project data
const projects = [
    {
        id: 1,
        title: "Niche Web Project",
        description: "A custom web application with handcrafted CSS and unique illustrations.",
        imageUrl: "/images/project1.jpg",
        link: "/projects/1"
    },
    {
        id: 2,
        title: "CSS Experiment",
        description: "Exploring the boundaries of what's possible with modern CSS techniques.",
        imageUrl: "/images/project2.jpg",
        link: "/projects/2"
    },
    {
        id: 3,
        title: "Illustration Work",
        description: "Custom illustrations for digital platforms and print media.",
        imageUrl: "/images/project3.jpg",
        link: "/projects/3"
    },
    {
        id: 4,
        title: "Airport Code Project",
        description: "A visual exploration of airport codes around the world.",
        imageUrl: "/images/project4.jpg",
        link: "/projects/4"
    },
    {
        id: 5,
        title: "Streaming Platform Concept",
        description: "UI design and branding for a niche streaming service.",
        imageUrl: "/images/project5.jpg",
        link: "/projects/5"
    },
    {
        id: 6,
        title: "CSS is Awesome",
        description: "A showcase of creative CSS techniques and animations.",
        imageUrl: "/images/project6.jpg",
        link: "/projects/6"
    }
];

export default function Projects() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="container mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold mb-12 text-center animate-fade-in">Archive</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className="card overflow-hidden animate-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="relative h-48 w-full image-container">
                            <PlaceholderImage
                                width={400}
                                height={200}
                                className="w-full h-full"
                                alt={project.title}
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-medium mb-2">{project.title}</h2>
                            <p className="opacity-70 mb-4 text-sm">{project.description}</p>
                            <Link href={project.link}>
                                View Project →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 