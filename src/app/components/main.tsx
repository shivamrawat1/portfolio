"use client"

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "../styles/main.module.css";
import Header from "./header";
import Footer from "./footer";
import HomePage from "./pages/home";
import Projects from "./pages/projects";
import WritingPage from "./pages/writing";
import AboutPage from "./pages/about";
import FriendsPage from "./pages/friends";
import TidbitsPage from "./pages/tidbits";
export default function Main() {
    const [currentPage, setCurrentPage] = useState("home");
    const [categoryHeader, setCategoryHeader] = useState<React.ReactNode | null>(null);
    const mainContentRef = useRef<HTMLDivElement>(null);
    const isUpdatingRef = useRef(false);

    // Function to set the category header based on current page
    // Wrap in useCallback to prevent recreation on every render
    const updateCategoryHeader = useCallback((header: React.ReactNode) => {
        if (!isUpdatingRef.current) {
            isUpdatingRef.current = true;

            setTimeout(() => {
                setCategoryHeader(header);
                isUpdatingRef.current = false;
            }, 0);
        }
    }, []);

    // Reset scroll position when changing pages
    useEffect(() => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollTop = 0;
        }
    }, [currentPage]);

    useEffect(() => {
        const calculateTotalHeaderHeight = () => {
            const navContainer = document.querySelector('.sticky_nav_container');
            if (navContainer) {
                const totalHeight = navContainer.getBoundingClientRect().height + 2;
                document.documentElement.style.setProperty('--total-header-height', `${totalHeight}px`);
            }
        };

        setTimeout(calculateTotalHeaderHeight, 100);
        window.addEventListener('resize', calculateTotalHeaderHeight);

        return () => window.removeEventListener('resize', calculateTotalHeaderHeight);
    }, [categoryHeader]);

    return (
        <div className={styles.main_wrapper}>
            <div className={styles.sticky_nav_container}>
                <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
                {categoryHeader && (
                    <div className={styles.sticky_category_header}>
                        {categoryHeader}
                    </div>
                )}
            </div>
            <main ref={mainContentRef} className={styles.main}>
                {currentPage === "home" && <HomePage />}
                {currentPage === "about" && <AboutPage />}
                {currentPage === "writing" && <WritingPage updateCategoryHeader={updateCategoryHeader} />}
                {currentPage === "projects" && <Projects updateCategoryHeader={updateCategoryHeader} />}
                {currentPage === "friends" && <FriendsPage />}
                {currentPage === "tidbits" && <TidbitsPage updateCategoryHeader={updateCategoryHeader} />}
            </main>

            <div className={styles.footer_container}>
                <Footer />
            </div>
        </div>
    );
}
