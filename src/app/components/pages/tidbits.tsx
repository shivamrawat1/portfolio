"use client"

import { useEffect, useState } from "react";
import styles from "../../styles/pages/tidbits.module.css";

interface TidbitsPageProps {
    updateCategoryHeader?: (header: React.ReactNode) => void;
}

interface TidbitCard {
    id: number;
    title: string;
    frontContent: string;
    backContent: string[];
}

export default function TidbitsPage({ updateCategoryHeader }: TidbitsPageProps) {
    const [flippedCards, setFlippedCards] = useState<number[]>([]);

    // Update the parent component with our header if the prop exists
    useEffect(() => {
        if (updateCategoryHeader) {
            updateCategoryHeader(null);
            return () => {
                updateCategoryHeader(null);
            };
        }
    }, [updateCategoryHeader]);

    const tidbitCards: TidbitCard[] = [
        {
            id: 1,
            title: "Movies & Shows",
            frontContent: "My favorite movies and TV shows that have left a lasting impact",
            backContent: [
                "Everything Everywhere All at Once (2022)",
                "The Half of It (2020)",
                "Anora (2024)"
            ]
        },
        {
            id: 2,
            title: "Books",
            frontContent: "Books that have shaped my thinking and perspective",
            backContent: [
                "Flow - Mihaly Csikszentmihalyi",
                "A Little Life - Hanya Yanagihara",
                "Atomic Habits - James Clear"
            ]
        },
        {
            id: 3,
            title: "Beliefs",
            frontContent: "Core principles and beliefs that guide my decisions",
            backContent: [
                "Happiness without lying to the self",
                "I can learn anything, jut need to aligh it to my values",
                "Like people and they will like you back",
                "Focus on work and skills, money will follow",
                "Maximise growth",
                "Interested in everything/everyone (at least in spirit)"
            ]
        },
    ];

    const toggleCard = (cardId: number) => {
        setFlippedCards(prev =>
            prev.includes(cardId)
                ? prev.filter(id => id !== cardId)
                : [...prev, cardId]
        );
    };

    return (
        <div className={styles.tidbits_container}>
            <div className={styles.cards_grid}>
                {tidbitCards.map(card => (
                    <div
                        key={card.id}
                        className={`${styles.card} ${flippedCards.includes(card.id) ? styles.flipped : ''}`}
                        onClick={() => toggleCard(card.id)}
                    >
                        <div className={styles.card_inner}>
                            <div className={styles.card_front}>
                                <h3>{card.title}</h3>
                                <p>{card.frontContent}</p>
                            </div>
                            <div className={styles.card_back}>
                                <h3>{card.title}</h3>
                                <ul>
                                    {card.backContent.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 