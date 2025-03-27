"use client"

import styles from "../../styles/pages/projects.module.css";
import ProjectCard from "../project-card";

export default function ProjectsPage() {
    const projects = [
        {
            id: 1,
            title: "Project Title",
            description: "askcakhscb akh kxhbnasjibxasjk casca nxjasnxjasnx",
            date: "01/05/25",
            category: "TITLE"
        },
        {
            id: 2,
            title: "Project Title",
            description: "askcakhscb akh kxhbnasjibxasjk casca nxjasnxjasnx",
            date: "01/05/25",
            category: "TITLE"
        },
        {
            id: 3,
            title: "Project Title",
            description: "askcakhscb akh kxhbnasjibxasjk casca nxjasnxjasnx",
            date: "01/05/25",
            category: "TITLE"
        },
        {
            id: 4,
            title: "Project Title",
            description: "askcakhscb akh kxhbnasjibxasjk casca nxjasnxjasnx",
            date: "01/05/25",
            category: "TITLE"
        }
    ];

    return (
        <div className={styles.projects_container}>
            <div className={styles.projects_row}>
                {projects.map(project => (
                    <div key={project.id} className={styles.project_column}>
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </div>
    );
} 