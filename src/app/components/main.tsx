"use client"

import { useState } from "react";
import styles from "../styles/main.module.css";
import Header from "./header";
import HomePage from "./pages/home";
import ProjectsPage from "./pages/projects";
import WritingPage from "./pages/writing";
import AboutPage from "./pages/about";

export default function Main() {
    const [currentPage, setCurrentPage] = useState("home");

    return (
        <div className={styles.page_container}>
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

            {currentPage === "home" && <HomePage />}
            {currentPage === "about" && <AboutPage />}
            {currentPage === "writing" && <WritingPage />}
            {currentPage === "projects" && <ProjectsPage />}
        </div>
    );
}
