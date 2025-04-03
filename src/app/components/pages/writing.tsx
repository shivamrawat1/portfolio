"use client"

import styles from "../../styles/pages/writing.module.css";
import ArticleCard from "../article-card";
import { useState, useEffect, useMemo } from "react";

// Add this prop to your component
interface WritingPageProps {
    updateCategoryHeader: (header: React.ReactNode) => void;
}

export default function WritingPage({ updateCategoryHeader }: WritingPageProps) {
    const [animationKey] = useState(0);

    // Wrap articles in useMemo to prevent recreation on every render
    const articles = useMemo(() => [
        {
            id: 1,
            title: "Biowarfare Against the Dengue Virus",
            description: "A simple genetic tweak to prevent dengue epidemics",
            date: "21/04/23",
            category: "genetics",
            url: "https://shivamrawat1.substack.com/p/biowarfare-against-the-dengue-virus"
        },
        {
            id: 2,
            title: "Using Pollination Networks to Aid Conservation Efforts in Redlined Neighborhoods",
            description: "Linking ecological function and environmental justice through urban biodiversity",
            date: "22/11/22",
            category: "evolution",
            url: "https://shivamrawat1.substack.com/p/using-pollination-networks-to-aid"
        }
    ], []);

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