"use client"

import { useRouter } from 'next/navigation';
import styles from "../styles/project-card.module.css";
import Image from 'next/image';

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

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const router = useRouter();

    const handleViewProject = () => {
        if (project.link) {
            window.open(project.link, '_blank');
        } else {
            router.push(`/projects/${project.id}`);
        }
    };

    const getThemeClass = () => {
        if (project.id % 4 === 0) {
            return styles.theme_four;
        } else if (project.id % 3 === 0) {
            return styles.theme_three;
        } else if (project.id % 2 === 0) {
            return styles.theme_two;
        } else {
            return styles.theme_one;
        }
    };

    return (
        <div className={`${styles.project_card} ${getThemeClass()}`}>
            <div className={styles.top_row}>
                <h3 className={styles.issue_title}>{project.title}</h3>
                <div className={styles.image_container}>
                    {project.image && (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className={styles.project_image}
                        />
                    )}
                    <div className={styles.view_button_container}>
                        <button className={styles.view_button} onClick={handleViewProject}>View Project</button>
                    </div>
                </div>
            </div>
            <div className={styles.bottom_row}>
                <div className={styles.content_section}>
                    <p className={styles.description}>{project.description}</p>
                </div>
                <hr className={styles.divider} />
                <div className={styles.techstack_section}>
                    {project.techstack?.map((tech, index) => (
                        <span key={index} className={styles.tech_item}>
                            {tech}
                        </span>
                    ))}
                </div>
                <hr className={styles.bottom_divider} />
                <div className={styles.category_section}>
                    <p className={styles.category}>#{project.category}</p>
                    <p className={styles.date}>{project.date}</p>
                </div>
            </div>
        </div>
    );
} 