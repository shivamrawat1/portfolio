"use client"

import { useEffect } from "react";
import styles from "../../styles/pages/tidbits.module.css";

interface TidbitsPageProps {
    updateCategoryHeader?: (header: React.ReactNode) => void;
}

export default function TidbitsPage({ updateCategoryHeader }: TidbitsPageProps) {
    // Update the parent component with our header if the prop exists
    useEffect(() => {
        if (updateCategoryHeader) {
            updateCategoryHeader(null);
            return () => {
                updateCategoryHeader(null);
            };
        }
    }, [updateCategoryHeader]);

    return (
        <div className={styles.tidbits_container}>
            <div className={styles.coming_soon}>
                <div className={styles.message_container}>
                    <h2 className={styles.title}>Tidbits</h2>
                    <p className={styles.message}>This section is coming soon</p>
                    <div className={styles.construction_line}></div>
                </div>
            </div>
        </div>
    );
} 