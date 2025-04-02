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
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);
    const filterButtonRef = useRef<HTMLButtonElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
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
            image: "/head.png", // Add your image path
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
            id: 2,
            title: "Project 1",
            description: "This is a description for project 1",
            date: "2023-01-01",
            image: "/head.png", // Add your image path
            category: "Web",
            techstack: [
                "React",
                "JavaScript",
                "Firebase",
                "Tailwind CSS"
            ]
        },
        {
            id: 3,
            title: "Project 2",
            description: "This is a description for project 2",
            date: "2023-02-01",
            category: "Mobile",
            image: "/bg.png", // Add your image path
            techstack: [
                "React Native",
                "TypeScript",
                "Redux",
                "Firebase"
            ]
        },
        {
            id: 4,
            title: "Project 2",
            description: "This is a description for project 2",
            date: "2023-02-01",
            category: "Mobile",
            image: "/bg.png", // Add your image path
            techstack: [
                "React Native",
                "TypeScript",
                "Redux",
                "Firebase"
            ]
        },
        {
            id: 5,
            title: "Project 2",
            description: "This is a description for project 2",
            date: "2023-02-01",
            category: "Mobile",
            image: "/bg.png", // Add your image path
            techstack: [
                "React Native",
                "TypeScript",
                "Redux",
                "Firebase"
            ]
        },
        {
            id: 6,
            title: "Project 2",
            description: "This is a description for project 2",
            date: "2023-02-01",
            category: "Mobile",
            image: "/bg.png", // Add your image path
            techstack: [
                "React Native",
                "TypeScript",
                "Redux",
                "Firebase"
            ]
        }
        // Add more sample projects as needed
    ];

    // Get unique categories
    const categories = Array.from(new Set(projectsData.map(project => project.category)));

    // Filter projects based on selected category
    const filteredProjects = selectedCategory
        ? projectsData.filter(project => project.category === selectedCategory)
        : projectsData;

    // Setup smooth horizontal scrolling with vertical fallback
    const setupHorizontalScroll = useCallback(() => {
        if (!projectsGridRef.current) return;

        let isScrolling = false;
        let startX = 0;
        let startY = 0;
        let startScrollLeft = 0;

        // Track if we're in horizontal or vertical mode
        let scrollMode: 'horizontal' | 'vertical' | null = null;

        const container = projectsGridRef.current;

        const onMouseDown = (e: MouseEvent) => {
            isScrolling = true;
            startX = e.pageX;
            startY = e.pageY;
            startScrollLeft = container.scrollLeft;
            container.style.cursor = 'grabbing';
            scrollMode = null; // Reset mode on new interaction
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isScrolling) return;

            const deltaX = e.pageX - startX;
            const deltaY = e.pageY - startY;

            // Determine scroll mode if not already set
            if (!scrollMode) {
                // If horizontal movement is greater, lock to horizontal scrolling
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    scrollMode = 'horizontal';
                } else {
                    scrollMode = 'vertical';
                }
            }

            if (scrollMode === 'horizontal') {
                e.preventDefault();
                container.scrollLeft = startScrollLeft - deltaX;
            }
            // For vertical mode, do nothing and let the browser handle it
        };

        const onMouseUp = () => {
            isScrolling = false;
            container.style.cursor = 'grab';
            scrollMode = null;
        };

        const onWheel = (e: WheelEvent) => {
            // Check if we're at the end of horizontal scroll
            const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;

            // If not at the end or scrolling left, handle horizontal scrolling
            if (!isAtEnd || e.deltaY < 0) {
                e.preventDefault();
                // Multiply by 3 to make scrolling faster
                container.scrollLeft += e.deltaY * 3;
            }
            // Otherwise, let the natural vertical scrolling happen
        };

        // Add all event listeners
        container.style.cursor = 'grab';
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
    }, [animationKey, selectedCategory, setupHorizontalScroll]);

    // Handle category click
    const handleCategoryClick = (category: string, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        setAnimationKey(prev => prev + 1);

        setSelectedCategory(prevCategory =>
            prevCategory === category ? null : category
        );
        setShowFilterPopup(false);
    };

    // Handle filter button click
    const handleFilterClick = (event: React.MouseEvent) => {
        event.preventDefault();
        setShowFilterPopup(prev => !prev);
    };

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                filterButtonRef.current &&
                !filterButtonRef.current.contains(event.target as Node)) {
                setShowFilterPopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Clear filter
    const clearFilter = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        setAnimationKey(prev => prev + 1);

        setSelectedCategory(null);
        setShowFilterPopup(false);
    };

    // Create a header component using useMemo to prevent recreation on every render
    const categoryHeader = useMemo(() => (
        <div className={styles.category_header}>
            <div className={styles.header_content}>
                <h2>PROJECTS</h2>
                <div className={styles.filter_container}>
                    <div className={styles.filter_wrapper}>
                        <button
                            className={styles.filter_button}
                            onClick={handleFilterClick}
                            ref={filterButtonRef}
                        >
                            {selectedCategory ? `Filtered: #${selectedCategory}` : "Filter by Category"}
                        </button>

                        {showFilterPopup && (
                            <div
                                className={styles.filter_popup}
                                ref={popupRef}
                            >
                                <div className={styles.popup_header}>
                                    <h3>Filter by Category</h3>
                                </div>
                                <div className={styles.categories_list}>
                                    {categories.map(category => (
                                        <div
                                            key={category}
                                            className={`${styles.category_item} ${selectedCategory === category ? styles.selected : ''}`}
                                            onClick={(e) => handleCategoryClick(category, e)}
                                        >
                                            #{category}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {selectedCategory && (
                        <button
                            className={styles.clear_filter}
                            onClick={clearFilter}
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>
        </div>
    ), [selectedCategory, showFilterPopup, categories]);

    // Create a separate effect just for updating the header
    useEffect(() => {
        // Only run this once when the component mounts
        updateCategoryHeader(categoryHeader);

        // Clean up when unmounting
        return () => {
            updateCategoryHeader(null);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array - only run on mount/unmount

    return (
        <div className={styles.projects_container} ref={containerRef}>
            <div
                className={styles.projects_horizontal}
                key={animationKey}
                ref={projectsGridRef}
            >
                {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
} 