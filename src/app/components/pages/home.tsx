import styles from "../../styles/pages/home.module.css";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface HomePageProps {
    setCurrentPage?: (page: string) => void;
}

export default function HomePage({ setCurrentPage }: HomePageProps) {
    // Reference to the SVG container to help with positioning
    const svgContainerRef = useRef<HTMLDivElement>(null);

    const handleNavigation = (page: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        if (setCurrentPage) {
            setCurrentPage(page);
        }
    };

    // This useEffect can be used to fine-tune the positioning of clickable areas
    // based on the actual rendered size of the SVG
    useEffect(() => {
        const adjustClickableAreas = () => {
            // You could add dynamic adjustment code here if needed
            // For now, the CSS percentages should handle most cases
        };

        // Adjust on load and window resize
        adjustClickableAreas();
        window.addEventListener('resize', adjustClickableAreas);

        return () => {
            window.removeEventListener('resize', adjustClickableAreas);
        };
    }, []);

    return (
        <div className={styles.home_container}>
            <div className={styles.hero_image_container} ref={svgContainerRef}>
                <Image
                    src="/heroimage.svg"
                    alt="Island illustration"
                    width={1200}
                    height={1200}
                    priority
                    className={`${styles.file_svg} ${styles.levitate}`}
                />

                {/* Clickable areas overlaying the SVG */}
                <div className={styles.clickable_areas}>
                    <div
                        className={`${styles.clickable_area} ${styles.tidbits_area}`}
                        onClick={handleNavigation("tidbits")}
                        title="Tidbits"
                    >
                        <span>Tidbits</span>
                    </div>

                    <div
                        className={`${styles.clickable_area} ${styles.writing_area}`}
                        onClick={handleNavigation("writing")}
                        title="Writing"
                    >
                        <span>Writing</span>
                    </div>

                    <div
                        className={`${styles.clickable_area} ${styles.friends_area}`}
                        onClick={handleNavigation("friends")}
                        title="Friends"
                    >
                        <span>Friends</span>
                    </div>

                    <div
                        className={`${styles.clickable_area} ${styles.projects_area}`}
                        onClick={handleNavigation("projects")}
                        title="Projects"
                    >
                        <span>Projects</span>
                    </div>

                    <div
                        className={`${styles.clickable_area} ${styles.about_area}`}
                        onClick={handleNavigation("about")}
                        title="About"
                    >
                        <span>About</span>
                    </div>
                </div>
            </div>
        </div>
    );
} 