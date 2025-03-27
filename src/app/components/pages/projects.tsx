"use client"

import { useState, useEffect, useRef, useMemo } from 'react';
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
    const [navHeight, setNavHeight] = useState(160); // Default value

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

    // Setup horizontal scroll with mouse wheel
    const setupHorizontalScroll = () => {
        if (projectsGridRef.current) {
            const handleWheel = (e: WheelEvent) => {
                e.preventDefault();
                projectsGridRef.current!.scrollLeft += e.deltaY;
            };

            projectsGridRef.current.addEventListener('wheel', handleWheel, { passive: false });

            return () => {
                if (projectsGridRef.current) {
                    projectsGridRef.current.removeEventListener('wheel', handleWheel);
                }
            };
        }
        return undefined;
    };

    // Initial setup of horizontal scroll
    useEffect(() => {
        return setupHorizontalScroll();
    }, []);

    // Re-setup horizontal scroll after filtering (when animationKey changes)
    useEffect(() => {
        // Small delay to ensure the DOM has updated
        const timeoutId = setTimeout(() => {
            return setupHorizontalScroll();
        }, 100);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [animationKey]);

    // Handle category click
    const handleCategoryClick = (category: string, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        // Update animation key to trigger fresh animations
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

        // Update animation key to trigger fresh animations
        setAnimationKey(prev => prev + 1);

        setSelectedCategory(null);
        setShowFilterPopup(false);
    };

    useEffect(() => {
        // Function to calculate the navigation height
        const calculateNavHeight = () => {
            const navElement = document.querySelector('nav'); // Adjust selector as needed
            const logoElement = document.querySelector('.logo-section'); // Adjust selector as needed

            if (navElement && logoElement) {
                const totalHeight = navElement.getBoundingClientRect().height +
                    logoElement.getBoundingClientRect().height;
                setNavHeight(totalHeight);
            }
        };

        // Calculate on mount and window resize
        calculateNavHeight();
        window.addEventListener('resize', calculateNavHeight);

        return () => {
            window.removeEventListener('resize', calculateNavHeight);
        };
    }, []);

    // Add this to your existing useEffect that calculates heights
    useEffect(() => {
        // Function to calculate the navigation height
        const calculateHeaderHeight = () => {
            const navContainer = document.querySelector('.sticky-nav-container');

            if (navContainer) {
                const headerHeight = navContainer.getBoundingClientRect().height;
                // Use a ref instead of state to avoid re-renders
                document.documentElement.style.setProperty('--sticky-header-height', `${headerHeight}px`);
            }
        };

        // Calculate on mount and window resize
        calculateHeaderHeight();

        // Only add the event listener once
        window.addEventListener('resize', calculateHeaderHeight);

        return () => {
            window.removeEventListener('resize', calculateHeaderHeight);
        };
        // Empty dependency array to run only on mount
    }, []);

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

    // Update the parent component with our header
    useEffect(() => {
        updateCategoryHeader(categoryHeader);

        // Clean up when component unmounts
        return () => {
            updateCategoryHeader(null);
        };
    }, [selectedCategory, showFilterPopup]);

    return (
        <div className={styles.projects_container}>
            <div className={styles.projects_horizontal} key={animationKey} ref={projectsGridRef}>
                {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
} 