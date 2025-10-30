import styles from "../../styles/pages/home.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface HomePageProps {
    setCurrentPage?: (page: string) => void;
}

export default function HomePage({ setCurrentPage }: HomePageProps) {
    // Reference to the SVG container to help with positioning
    const svgContainerRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [muted, setMuted] = useState(true);

    const handleNavigation = (page: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        if (setCurrentPage) {
            setCurrentPage(page);
        }
    };

    // This useEffect can be used to fine-tune the positioning of clickable areas
    // based on the actual rendered size of the SVG
    useEffect(() => {
        // Attempt to autoplay ambient audio, fall back to first user interaction
        const tryPlay = () => {
            if (audioRef.current) {
                audioRef.current.volume = 0.25;
                audioRef.current.muted = muted;
                audioRef.current.play().catch(() => {
                    // Ignore rejection; we'll try again on interaction
                });
            }
        };

        tryPlay();

        const onFirstInteraction = () => {
            tryPlay();
            window.removeEventListener('pointerdown', onFirstInteraction);
            window.removeEventListener('keydown', onFirstInteraction);
        };

        window.addEventListener('pointerdown', onFirstInteraction);
        window.addEventListener('keydown', onFirstInteraction);

        const adjustClickableAreas = () => {
            // You could add dynamic adjustment code here if needed
            // For now, the CSS percentages should handle most cases
        };

        // Adjust on load and window resize
        adjustClickableAreas();
        window.addEventListener('resize', adjustClickableAreas);

        return () => {
            window.removeEventListener('resize', adjustClickableAreas);
            window.removeEventListener('pointerdown', onFirstInteraction);
            window.removeEventListener('keydown', onFirstInteraction);
        };
    }, [muted]);

    // Keep audio muted state in sync when toggled
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = muted;
        }
    }, [muted]);

    return (
        <div className={styles.home_container_wrapper}>

            <div className={styles.home_container}>
                <audio
                    ref={audioRef}
                    src="/audio/nature-216798.mp3"
                    preload="auto"
                    loop
                    autoPlay
                    muted
                    playsInline
                />
                <button
                    aria-label={muted ? "Unmute background audio" : "Mute background audio"}
                    onClick={() => setMuted(m => !m)}
                    style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        zIndex: 10,
                        background: 'rgba(0,0,0,0.5)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 16,
                        padding: '6px 8px',
                        cursor: 'pointer',
                        lineHeight: 0,
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
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
        </div>
    );
} 