"use client"

import styles from "../../styles/pages/writing.module.css";
import ArticleCard from "../article-card";
import { useState, useEffect, useMemo } from "react";

// Add this prop to your component
interface WritingPageProps {
    updateCategoryHeader: (header: React.ReactNode) => void;
}

export default function WritingPage({ updateCategoryHeader }: WritingPageProps) {
    const [animationKey, setAnimationKey] = useState(0);

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
        }
    ], []);

    // Create a header component to pass up to the main component
    const categoryHeader = useMemo(() => (
        <div className={styles.category_header}>
            <div className={styles.header_content}>
                {/* Removed the h2 with "WRITING" text */}
            </div>
        </div>
    ), []);

    // Update the parent component with our header
    useEffect(() => {
        updateCategoryHeader(null);

        return () => {
            updateCategoryHeader(null);
        };
    }, [updateCategoryHeader]);

    return (
        <div className={styles.writing_container}>
            <div className={styles.articles_grid} key={animationKey}>
                {articles.map(article => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        onCategoryClick={() => { }}
                    />
                ))}
            </div>
        </div>
    );
} 