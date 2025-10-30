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
            title: "Engram",
            description: "Engram is an intelligent, AI-powered companion designed to make your learning faster, deeper, and longer-lasting — by blending the Science of Learning with cutting-edge AI technologies for a truly adaptive study experience.",
            date: "2025-03-15",
            category: "Web Development",
            image: "/projectimages/engram.png",
            techstack: ["Django", "Javascript", "CSS"],
            link: "https://github.com/shivamrawat1/engram"
        },
        {
            id: 2,
            title: "Techtonic",
            description: "TechTonic transforms technical interview preparation by focusing not just on solving coding problems but on structuring thought processes for clear, logical communication. Through AI-driven, structured feedback based on proven frameworks like UMPIRE, we help you identify and improve weaknesses, enhance problem-solving skills, and build confidence for high-pressure interview scenarios, all at an affordable cost.t",
            date: "2024-09-15",
            category: "Web Development",
            image: "/projectimages/techtonic.png",
            techstack: ["Django", "Javascript", "CSS"],
            link: "https://github.com/shivamrawat1/techtonic"
        },
        {
            id: 3,
            title: "BeeCode",
            description: "This project fine-tunes the SegFormer-B2 model using Hugging Face's transformers and datasets libraries for semantic segmentation tasks. The code handles preprocessing, dataset loading (in COCO format), custom metrics computation (IoU), and training using the Trainer API.",
            date: "2025-04-30",
            category: "Machine Learning",
            image: "/projectimages/beecode.png",
            techstack: ["Python", "Pytorch", "Hugging Face", "Computer Vision"],
            link: "https://github.com/shivamrawat1/BeeCode"
        },
        {
            id: 4,
            title: "Advosub.ai",
            description: "A web application for generating custom newsletters on latest news and research that matches your interest.",
            date: "2025-01-10",
            category: "Web App",
            image: "/projectimages/advosub.png",
            techstack: ["Flask", "Python", "Perplexity API", "OpenAI API"],
            link: "https://github.com/shivamrawat1/Advosub.ai"
        },
        {
            id: 5,
            title: "TipTap Extensions",
            description: "Implemented custom extensions for the TipTap editor.",
            date: "2025-02-03",
            category: "Web App",
            image: "/projectimages/tiptap.png",
            techstack: ["React", "Typescript", "Tailwind CSS"],
            link: "https://github.com/shivamrawat1/tiptap-extensions-backend"
        },
        {
            id: 6,
            title: "ReadMePlease.ai",
            description: "A Flask web application that generates Markdown documents by processing videos or GitHub repositories as input. ",
            date: "2024-08-20",
            category: "Web App",
            image: "/projectimages/readmeplease.png",
            techstack: ["Python", "Flask", "OpenAI API"],
            link: "https://github.com/shivamrawat1/READMEplease.ai"
        },
        {
            id: 7,
            title: "Task Scheduler",
            description: "A task scheduler that schedules tasks based on multiple constraints",
            date: "2023-11-01",
            category: "Algorithm",
            image: "/projectimages/taskscheduler.png",
            techstack: ["Python"],
            link: "https://github.com/shivamrawat1/python-task-scheduler"
        },
        {
            id: 8,
            title: "Accent Classification",
            description: "A classification model that predicts the accent of a speaker based on their speech",
            date: "2024-04-01",
            category: "ML",
            image: "/projectimages/accent.png",
            techstack: ["Python", "Pytorch", "Keras"],
            link: "https://github.com/shivamrawat1/accent-classification"
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