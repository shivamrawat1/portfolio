"use client"

import { useEffect, useRef, useState } from 'react';
import ProjectCard from '../project-card';
import styles from '../../styles/pages/projects.module.css';

// Interface definitions
interface Project {
    id: number;
    title: string;
    description: string;
    date: string;
    category: string;
    image?: string;
    techstack?: string[];
}

interface ProjectsProps {
    updateCategoryHeader: (header: React.ReactNode) => void;
}

export default function Projects({ updateCategoryHeader }: ProjectsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isDirectlyHovering, setIsDirectlyHovering] = useState(false);

    // Sample projects data
    const projectsData: Project[] = [
        {
            id: 1,
            title: "Portfolio Website",
            description: "My personal portfolio website built with Next.js and TypeScript",
            date: "2023-08-15",
            category: "Web Development",
            image: "/bg.png",
            techstack: ["React", "TypeScript", "Next.js", "CSS Modules"]
        },
        {
            id: 2,
            title: "Task Manager API",
            description: "A RESTful API for task management with authentication and authorization",
            date: "2023-06-10",
            category: "Backend",
            image: "/bg.png",
            techstack: ["Node.js", "Express", "MongoDB", "JWT"]
        },
        {
            id: 3,
            title: "E-commerce Platform",
            description: "Full-stack e-commerce platform with product listings, cart and checkout functionality",
            date: "2023-04-01",
            category: "Full Stack",
            image: "/bg.png",
            techstack: ["React", "Redux", "Node.js", "Express", "MongoDB", "Stripe API"]
        },
        {
            id: 4,
            title: "AI Image Generator",
            description: "Web application that generates images from text descriptions using AI",
            date: "2023-05-20",
            category: "AI/ML",
            image: "/bg.png",
            techstack: ["Python", "Flask", "React", "OpenAI API"]
        },
        {
            id: 5,
            title: "Mobile Fitness App",
            description: "Cross-platform mobile app for tracking workouts and nutrition",
            date: "2023-07-12",
            category: "Mobile",
            image: "/bg.png",
            techstack: ["React Native", "Firebase", "Redux", "Expo"]
        },
        {
            id: 6,
            title: "Blockchain Voting System",
            description: "Secure voting platform built on blockchain technology",
            date: "2023-03-15",
            category: "Blockchain",
            image: "/bg.png",
            techstack: ["Solidity", "Ethereum", "Web3.js", "React"]
        }
    ];

    // Tell parent component we don't want a header
    useEffect(() => {
        updateCategoryHeader(null);
        return () => updateCategoryHeader(null);
    }, [updateCategoryHeader]);

    // Set up auto-scrolling with a JavaScript approach
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let animationId: number;
        let scrollPosition = 0;
        const scrollSpeed = 1; // pixels per frame

        // Function to handle auto-scrolling
        const autoScroll = () => {
            // Only pause scrolling when directly hovering over projects or when dragging
            if (!isDirectlyHovering && !isDragging && container) {
                scrollPosition += scrollSpeed;

                // Reset when we reach the end to create a loop
                if (scrollPosition >= container.scrollWidth - container.clientWidth) {
                    scrollPosition = 0;
                }

                container.scrollLeft = scrollPosition;
            }
            animationId = requestAnimationFrame(autoScroll);
        };

        // Start auto-scrolling
        animationId = requestAnimationFrame(autoScroll);

        // Clean up
        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [isDragging, isDirectlyHovering]);

    // Implement drag-to-scroll
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;

        setIsDragging(true);
        setStartX(e.pageX);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
        scrollContainerRef.current.style.cursor = 'grabbing';
        e.preventDefault();
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;

        const x = e.pageX;
        const walk = (startX - x) * 2; // Scroll speed multiplier
        scrollContainerRef.current.scrollLeft = scrollLeft + walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.cursor = 'grab';
        }
    };

    const handleMouseLeave = () => {
        setIsDirectlyHovering(false);
        if (isDragging) {
            setIsDragging(false);
            if (scrollContainerRef.current) {
                scrollContainerRef.current.style.cursor = 'grab';
            }
        }
    };

    const handleMouseEnter = () => {
        setIsDirectlyHovering(true);
    };

    // Touch event handlers for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        if (!scrollContainerRef.current) return;

        setIsDragging(true);
        setStartX(e.touches[0].clientX);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;

        const x = e.touches[0].clientX;
        const walk = (startX - x) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft + walk;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // For smoother infinite scrolling, we duplicate the projects
    const allProjects = [...projectsData, ...projectsData, ...projectsData];

    return (
        <div className={styles.projects_container}>
            <div
                className={styles.projects_scroll}
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {allProjects.map((project, index) => (
                    <div key={`${project.id}-${index}`} className={styles.project_item}>
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </div>
    );
} 