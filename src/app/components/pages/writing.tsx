"use client"

import styles from "../../styles/pages/writing.module.css";
import ArticleCard from "../article-card";
import { useState, useEffect, useRef, useMemo } from "react";

// Add this prop to your component
interface WritingPageProps {
    updateCategoryHeader: (header: React.ReactNode) => void;
}

export default function WritingPage({ updateCategoryHeader }: WritingPageProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);
    const filterButtonRef = useRef<HTMLButtonElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    // Wrap articles in useMemo to prevent recreation on every render
    const articles = useMemo(() => [
        {
            id: 1,
            title: "Title",
            description: "cjohc dewkcnwencwke cwjenchjwnechewbfchegbvcjwecjgewqv chjgwechjwechjejch dhwegj dwejehd dqjhdkhqd qjdbqkd qkjwd xqk kdbqwkd q db qj dqkd qj dqkw",
            date: "01/05/25",
            category: "new",
            url: "/writing/article-1"
        },
        {
            id: 2,
            title: "Title",
            description: "cjohc dewkcnwencwke cwjenchjwnechewbfchegbvcjwecjgewqv chjgwechjwechjejch dhwegj dwejehd dqjhdkhqd qjdbqkd qkjwd xqk kdbqwkd q db qj dqkd qj dqkw",
            date: "01/01/25",
            category: "current",
            url: "/writing/article-2"
        },
        {
            id: 3,
            title: "Title",
            description: "cjohc dewkcnwencwke cwjenchjwnechewbfchegbvcjwecjgewqv chjgwechjwechjejch dhwegj dwejehd dqjhdkhqd qjdbqkd qkjwd xqk kdbqwkd q db qj dqkd qj dqkw",
            date: "01/05/25",
            category: "current",
            url: "/writing/article-3"
        },
        {
            id: 4,
            title: "Title",
            description: "cjohc dewkcnwencwke cwjenchjwnechewbfchegbvcjwecjgewqv chjgwechjwechjejch dhwegj dwejehd dqjhdkhqd qjdbqkd qkjwd xqk kdbqwkd q db qj dqkd qj dqkw",
            date: "01/05/25",
            category: "current",
            url: "/writing/article-4"
        },
        {
            id: 5,
            title: "Title",
            description: "cjohc dewkcnwencwke cwjenchjwnechewbfchegbvcjwecjgewqv chjgwechjwechjejch dhwegj dwejehd dqjhdkhqd qjdbqkd qkjwd xqk kdbqwkd q db qj dqkd qj dqkw",
            date: "01/05/25",
            category: "current",
            url: "/writing/article-5"
        },
        {
            id: 6,
            title: "Title",
            description: "cjohc dewkcnwencwke cwjenchjwnechewbfchegbvcjwecjgewqv chjgwechjwechjejch dhwegj dwejehd dqjhdkhqd qjdbqkd qkjwd xqk kdbqwkd q db qj dqkd qj dqkw",
            date: "01/05/25",
            category: "old",
            url: "/writing/article-6"
        },
        {
            id: 7,
            title: "Title",
            description: "cjohc dewkcnwencwke cwjenchjwnechewbfchegbvcjwecjgewqv chjgwechjwechjejch dhwegj dwejehd dqjhdkhqd qjdbqkd qkjwd xqk kdbqwkd q db qj dqkd qj dqkw",
            date: "01/05/25",
            category: "new",
            url: "/writing/article-7"
        },
        {
            id: 8,
            title: "Title",
            description: "cjohc dewkcnwencwke cwjenchjwnechewbfchegbvcjwecjgewqv chjgwechjwechjejch dhwegj dwejehd dqjhdkhqd qjdbqkd qkjwd xqk kdbqwkd q db qj dqkd qj dqkw",
            date: "01/05/25",
            category: "old",
            url: "/writing/article-8"
        },
        {
            id: 9,
            title: "Title nidabsuicdbw ohdouncu9wdshc hdewh9hwd90hnd hdew9ewn",
            description: "cjohc dewkcnwencwke cwjenchjwnechewbfchegbvcjwecjgewqv chjgwechjwechjejch dhwegj dwejehd dqjhdkhqd qjdbqkd qkjwd xqk kdbqwkd q db qj dqkd qj dqkw kjbdasjic wdis ci dsvcuosbdvoucbsouvnbcosdncosd vcosdicnsnd0coibsnd0invcisdn vci0sdnvcoipsndi vcis dvsdbv dsvcs d 0v cw0s v0s d0v",
            date: "01/05/25",
            category: "old",
            url: "/writing/article-9"
        },
        {
            id: 10,
            title: "Title",
            description: "cjohc dewkcnwencwke cwjenchjwnechewbfchegbvcjwecjgewqv chjgwechjwechjejch dhwegj dwejehd dqjhdkhqd qjdbqkd qkjwd xqk kdbqwkd q db qj dqkd qj dqkw",
            date: "01/05/25",
            category: "new",
            url: "/writing/article-10"
        },
        {
            id: 11,
            title: "Title",
            description: "cjohc dewkcnwencwke cwjenchjwnechewbfchegbvcjwecjgewqv chjgwechjwechjejch dhwegj dwejehd dqjhdkhqd qjdbqkd qkjwd xqk kdbqwkd q db qj dqkd qj dqkw",
            date: "01/05/25",
            category: "new",
            url: "/writing/article-11"
        },
        {
            id: 12,
            title: "Title",
            description: "cjohc dewkcnwencwke cwjenchjwnechewbfchegbvcjwecjgewqv chjgwechjwechjejch dhwegj dwejehd dqjhdkhqd qjdbqkd qkjwd xqk kdbqwkd q db qj dqkd qj dqkw",
            date: "01/05/25",
            category: "new",
            url: "/writing/article-12"
        }
    ], []);

    // Get unique categories
    const categories = useMemo(() =>
        Array.from(new Set(articles.map(article => article.category)))
        , [articles]);

    // Filter articles based on selected category
    const filteredArticles = useMemo(() =>
        selectedCategory
            ? articles.filter(article => article.category === selectedCategory)
            : articles
        , [selectedCategory, articles]);

    // Handle category click
    const handleCategoryClick = (category: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

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

    // Debug log for filtered articles
    useEffect(() => {
        console.log("Selected category:", selectedCategory);
        console.log("Filtered articles:", filteredArticles.length);
    }, [selectedCategory, filteredArticles]);

    // Create a header component to pass up to the main component
    const categoryHeader = useMemo(() => (
        <div className={styles.category_header}>
            <div className={styles.header_content}>
                <h2>WRITING</h2>
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

        return () => {
            updateCategoryHeader(null);
        };
    }, [categoryHeader, updateCategoryHeader]);

    return (
        <div className={styles.writing_container}>
            <div className={styles.articles_grid} key={animationKey}>
                {filteredArticles.map(article => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        onCategoryClick={handleCategoryClick}
                    />
                ))}
            </div>
        </div>
    );
} 