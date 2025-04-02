"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ProjectCard from '../project-card';
import styles from '../../styles/pages/projects.module.css';

// Update the interface
interface Project {
    id: number;
    title: string;
    description: string;
    date: string;
    category: string;
    image?: string;
    techstack?: string[]; // Changed from authors to techstack
}

// Add this prop to your component
interface ProjectsProps {
    updateCategoryHeader: (header: React.ReactNode) => void;
}

export default function Projects({ updateCategoryHeader }: ProjectsProps) {
    const [animationKey, setAnimationKey] = useState(0);
    const projectsGridRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Sample projects data - in a real app, this would come from an API or props
    const projectsData: Project[] = [
        {
            id: 1,
            title: "Spring Edition",
            description: "Our spring edition featuring articles on urban development",
            date: "2023-04-01",
            category: "Seasonal",
            image: "/bg.png", // Add your image path
            techstack: [
                "React",
                "TypeScript",
                "Next.js",
                "CSS Modules",
                "Node.js",
                "Express",
                "MongoDB"
            ]
        },
        {
            id: 1,
            title: "Spring Edition",
            description: "Our spring edition featuring articles on urban development",
            date: "2023-04-01",
            category: "Seasonal",
            image: "/bg.png", // Add your image path
            techstack: [
                "React",
                "TypeScript",
                "Next.js",
                "CSS Modules",
                "Node.js",
                "Express",
                "MongoDB"
            ]
        },
        {
            id: 1,
            title: "Spring Edition",
            description: "Our spring edition featuring articles on urban development",
            date: "2023-04-01",
            category: "Seasonal",
            image: "/bg.png", // Add your image path
            techstack: [
                "React",
                "TypeScript",
                "Next.js",
                "CSS Modules",
                "Node.js",
                "Express",
                "MongoDB"
            ]
        }
    ];

    // Setup horizontal scroll
    const setupHorizontalScroll = useCallback(() => {
        const container = containerRef.current;
        if (!container) return () => { };

        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        const onMouseDown = (e: MouseEvent) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            e.preventDefault();
        };

        const onMouseUp = () => {
            isDown = false;
            container.style.cursor = '';
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isDown) return;
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            container.scrollLeft = scrollLeft - walk;
        };

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        };

        container.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        container.addEventListener('wheel', onWheel, { passive: false });

        // Cleanup function
        return () => {
            if (container) {
                container.style.cursor = '';
                container.removeEventListener('mousedown', onMouseDown);
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                container.removeEventListener('wheel', onWheel);
            }
        };
    }, []);

    // Update the useEffect to use the new function
    useEffect(() => {
        const cleanup = setupHorizontalScroll();
        return cleanup;
    }, [setupHorizontalScroll]);

    // Update the reset useEffect
    useEffect(() => {
        // Small delay to ensure the DOM has updated
        const timeoutId = setTimeout(() => {
            const cleanup = setupHorizontalScroll();
            return cleanup;
        }, 100);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [animationKey, setupHorizontalScroll]);

    // Create a header component using useMemo to prevent recreation on every render
    const categoryHeader = useMemo(() => (
        <div className={styles.category_header}>
            <div className={styles.header_content}>
                <h2>PROJECTS</h2>
            </div>
        </div>
    ), []);

    // Create a separate effect just for updating the header
    useEffect(() => {
        updateCategoryHeader(categoryHeader);

        // Clean up when unmounting
        return () => {
            updateCategoryHeader(null);
        };
    }, [categoryHeader, updateCategoryHeader]); // Include dependencies to update when they change

    return (
        <div className={styles.projects_container} ref={containerRef}>
            <div
                className={styles.projects_horizontal}
                key={animationKey}
                ref={projectsGridRef}
            >
                {projectsData.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
} 