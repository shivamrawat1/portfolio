"use client"

import styles from "../styles/article-card.module.css";
import Link from "next/link";

interface ArticleProps {
    article: {
        id: number;
        title: string;
        description: string;
        date: string;
        category: string;
        url: string;
    };
    onCategoryClick?: (category: string, event: React.MouseEvent) => void;
}

export default function ArticleCard({ article, onCategoryClick }: ArticleProps) {
    const handleCategoryClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (onCategoryClick) {
            onCategoryClick(article.category, event);
        }
    };

    return (
        <div className={styles.article_card}>
            <div className={styles.card_content}>
                <h3 className={styles.title}>{article.title}</h3>
                <div className={styles.date_line}>
                    <hr className={styles.line} />
                    <span className={styles.date}>{article.date}</span>
                </div>
                <p className={styles.description}>{article.description}</p>
                <div className={styles.spacer}></div>
                <div className={styles.card_bottom}>
                    <Link href={article.url} className={styles.read_more}>
                        Read More &rarr;
                    </Link>
                    <div className={styles.card_footer}>
                        {article.category && (
                            <div
                                className={styles.category_container}
                                onClick={handleCategoryClick}
                            >
                                <span className={styles.category}>#{article.category}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 