"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

// Define 6 color themes, each with two complementary colors
const colorThemes = [
    { name: "teal", primary: "#1a2e3b", secondary: "#e6d9c9" },
    { name: "sage", primary: "#4a6c6f", secondary: "#f0f4e3" },
    { name: "terra", primary: "#b85042", secondary: "#f2e8cf" },
    { name: "mint", primary: "#4f6d7a", secondary: "#c0d6df" },
    { name: "olive", primary: "#606c38", secondary: "#fefae0" },
    { name: "plum", primary: "#5e548e", secondary: "#f9f4f5" }
];

export default function ThemeSelector() {
    const [mounted, setMounted] = useState(false);
    const [activeTheme, setActiveTheme] = useState('teal');
    const isChangingTheme = useRef(false);

    // Initialize theme on mount
    useEffect(() => {
        setMounted(true);

        // Get theme from localStorage or use default
        const savedTheme = localStorage.getItem('theme') || 'teal';
        applyTheme(savedTheme);
        setActiveTheme(savedTheme);
    }, []);

    // Direct theme application function
    const applyTheme = useCallback((themeName: string) => {
        if (isChangingTheme.current) return;
        isChangingTheme.current = true;

        try {
            // Remove all theme classes
            colorThemes.forEach(theme => {
                document.documentElement.classList.remove(theme.name);
            });

            // Add new theme class
            document.documentElement.classList.add(themeName);

            // Store in localStorage
            localStorage.setItem('theme', themeName);

            // Force CSS variable application
            document.documentElement.style.setProperty('--theme-applied', themeName);

            // Force a reflow
            void document.body.offsetHeight;
        } finally {
            // Reset flag after a short delay
            setTimeout(() => {
                isChangingTheme.current = false;
            }, 100);
        }
    }, []);

    // Handle theme change
    const handleThemeChange = useCallback((newTheme: string) => {
        if (activeTheme === newTheme || isChangingTheme.current) return;

        setActiveTheme(newTheme);
        applyTheme(newTheme);
        console.log("Theme changed to:", newTheme);
        document.documentElement.classList.forEach(cls => {
            console.log("Current classes:", cls);
        });
    }, [activeTheme, applyTheme]);

    if (!mounted) return null;

    return (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-10">
            <div className="flex flex-col space-y-3">
                {colorThemes.map((colorTheme) => (
                    <motion.button
                        key={colorTheme.name}
                        onClick={() => handleThemeChange(colorTheme.name)}
                        className={`w-12 h-8 rounded-md overflow-hidden ${activeTheme === colorTheme.name ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : ""
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Switch to ${colorTheme.name} theme`}
                    >
                        <div className="flex h-full">
                            <div className="w-1/2 h-full" style={{ backgroundColor: colorTheme.primary }}></div>
                            <div className="w-1/2 h-full" style={{ backgroundColor: colorTheme.secondary }}></div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
} 