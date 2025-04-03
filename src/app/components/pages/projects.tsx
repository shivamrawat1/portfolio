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
    link?: string;
}

interface ProjectsProps {
    updateCategoryHeader: (header: React.ReactNode) => void;
}

export default function Projects({ updateCategoryHeader }: ProjectsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Sample projects data
    const projectsData: Project[] = [
        {
            id: 1,
            title: "Techtonic",
            description: "TechTonic transforms technical interview preparation by focusing not just on solving coding problems but on structuring thought processes for clear, logical communication. Through AI-driven, structured feedback based on proven frameworks like UMPIRE, we help you identify and improve weaknesses, enhance problem-solving skills, and build confidence for high-pressure interview scenarios, all at an affordable cost.t",
            date: "2024-09-15",
            category: "Web Development",
            image: "/techtonic.png",
            techstack: ["Django", "Javascript", "CSS Modules"],
            link: "https://github.com/shivamrawat1/techtonic"
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
        if (isDragging) {
            setIsDragging(false);
            if (scrollContainerRef.current) {
                scrollContainerRef.current.style.cursor = 'grab';
            }
        }
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

    return (
        <div className={styles.projects_container}>
            <div
                className={`${styles.projects_scroll} ${isDragging ? styles.dragging : ''}`}
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {projectsData.map((project) => (
                    <div key={project.id} className={styles.project_item}>
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </div>
    );
} 