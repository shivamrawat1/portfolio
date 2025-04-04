"use client"

import styles from "../styles/header.module.css";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface HeaderProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
    const [displayText, setDisplayText] = useState("s4m0r3t");
    const decodingTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const startDecoding = () => {
        // Define the decoding steps to show the transformation clearly
        const decodingSteps = [
            "s4m0r3t",       // Original
            "s 4m0r3t",      // Step 1: Add space after 's'
            "s  m0r3t",      // Step 2: Remove '4'
            "shi m0r3t",     // Step 3: Expand 's' to 'shi'
            "shiv m0r3t",    // Step 4: Complete 'shiv'
            "shiva m0r3t",   // Step 5: Complete 'shiva'
            "shivam 0r3t",
            "Shivam 0r3t",   // Step 6: Add space after 'm'
            "Shivam  r3t",   // Step 7: Remove '0'
            "Shivam r 3t",   // Step 8: Add space after 'r'
            "Shivam r  t",   // Step 9: Remove '3'
            "Shivam ra t",   // Step 10: Expand 'r' to 'ra'
            "Shivam raw t",  // Step 11: Expand 'ra' to 'raw'
            "Shivam rawa t", // Step 12: Expand 'raw' to 'rawa'
            "Shivam rawat",   // Final: Complete word
            "Shivam Rawat"
        ];

        let currentStep = 0;

        const decode = () => {
            setDisplayText(decodingSteps[currentStep]);
            currentStep++;

            if (currentStep < decodingSteps.length) {
                // Continue the animation
                decodingTimerRef.current = setTimeout(decode, 40);
            }
        };

        // Start the animation
        decodingTimerRef.current = setTimeout(decode, 40);
    };

    const stopDecoding = () => {
        if (decodingTimerRef.current) {
            clearTimeout(decodingTimerRef.current);
        }
        setDisplayText("s4m0r3t");
    };

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (decodingTimerRef.current) {
                clearTimeout(decodingTimerRef.current);
            }
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavClick = (page: string) => {
        setCurrentPage(page);
        setIsMobileMenuOpen(false); // Close mobile menu after selection
    };

    return (
        <div className={styles.header_container}>
            <div className={styles.logo_container}>
                <div className={styles.logo}>
                    <Image
                        src="/head.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className={styles.avatar}
                        onClick={() => setCurrentPage("home")}
                        style={{ cursor: 'pointer' }}
                    />
                    <span
                        className={styles.logo_text}
                        onMouseEnter={startDecoding}
                        onMouseLeave={stopDecoding}
                    >
                        {displayText}
                    </span>
                </div>
            </div>

            <div className={styles.nav_container}>
                <button
                    className={styles.mobile_menu_button}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                >
                    {isMobileMenuOpen ? "✕" : "☰"}
                </button>

                <nav className={`${styles.navigation} ${isMobileMenuOpen ? styles.open : ""}`}>
                    <button
                        className={`${styles.nav_item} ${currentPage === "about" ? styles.active : ""}`}
                        onClick={() => handleNavClick("about")}
                    >
                        About
                    </button>
                    <button
                        className={`${styles.nav_item} ${currentPage === "writing" ? styles.active : ""}`}
                        onClick={() => handleNavClick("writing")}
                    >
                        Writing
                    </button>
                    <button
                        className={`${styles.nav_item} ${currentPage === "projects" ? styles.active : ""}`}
                        onClick={() => handleNavClick("projects")}
                    >
                        Projects
                    </button>
                    <button
                        className={`${styles.nav_item} ${currentPage === "tidbits" ? styles.active : ""}`}
                        onClick={() => handleNavClick("tidbits")}
                    >
                        Tidbits
                    </button>
                    <button
                        className={`${styles.nav_item} ${currentPage === "friends" ? styles.active : ""}`}
                        onClick={() => handleNavClick("friends")}
                    >
                        Friends
                    </button>
                </nav>
            </div>
        </div>
    );
} 