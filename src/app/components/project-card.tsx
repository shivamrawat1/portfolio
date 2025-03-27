"use client"

import styles from "../styles/project-card.module.css";

interface ProjectProps {
    project: {
        id: number;
        title: string;
        description: string;
        date: string;
        category: string;
    }
}

export default function ProjectCard({ project }: ProjectProps) {
    return (
        <div className={styles.card}>
            <div className={styles.title_column}>
                <h3 className={styles.title}>{project.category}</h3>
            </div>
            <div className={styles.content_area}>
                <div className={styles.view_button_container}>
                    <button className={styles.view_button}>View Project</button>
                </div>
                <div className={styles.description_area}>
                    <p className={styles.description}>{project.description}</p>
                    <hr className={styles.divider} />
                </div>
            </div>
        </div>
    );
} 