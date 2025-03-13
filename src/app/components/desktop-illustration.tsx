"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function DesktopIllustration() {
    const router = useRouter();

    return (
        <div className="w-full max-w-3xl mx-auto my-12">
            <motion.svg
                viewBox="0 0 800 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Background */}
                <rect width="800" height="400" fill="var(--background)" />

                {/* Shelf */}
                <motion.rect
                    x="100"
                    y="150"
                    width="600"
                    height="6"
                    rx="2"
                    fill="var(--accent)"
                    opacity="0.2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={{ transformOrigin: '100px 150px' }}
                />

                {/* Laptop/Computer (clickable - About) */}
                <motion.g
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    onClick={() => router.push('/about')}
                    className="cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                >
                    <rect x="300" y="200" width="200" height="140" rx="5" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
                    <rect x="320" y="220" width="160" height="90" rx="2" fill="var(--background)" stroke="var(--accent)" strokeWidth="1" />
                    <rect x="350" y="340" width="100" height="10" rx="2" fill="var(--accent)" opacity="0.2" />
                    <text x="400" y="270" textAnchor="middle" fill="var(--accent)" fontFamily="monospace" fontSize="16">Hello World</text>
                    <text x="400" y="370" textAnchor="middle" fill="var(--accent)" fontSize="12" opacity="0.7">About</text>
                </motion.g>

                {/* Person Portrait */}
                <motion.g
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <rect x="150" y="50" width="120" height="90" rx="3" fill="var(--accent)" opacity="0.1" stroke="var(--accent)" strokeWidth="1" />

                    {/* Simple face with glasses */}
                    <circle cx="210" cy="85" r="20" fill="var(--accent)" opacity="0.2" />
                    <rect x="200" y="80" width="20" height="5" rx="1" fill="var(--accent)" opacity="0.4" />
                    <circle cx="203" cy="82" r="5" fill="var(--background)" stroke="var(--accent)" strokeWidth="0.5" opacity="0.6" />
                    <circle cx="217" cy="82" r="5" fill="var(--background)" stroke="var(--accent)" strokeWidth="0.5" opacity="0.6" />

                    {/* Headphones */}
                    <path d="M190 85 C190 70, 210 65, 230 85" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.4" />
                    <rect x="185" y="80" width="5" height="10" rx="2" fill="var(--accent)" opacity="0.3" />
                    <rect x="230" y="80" width="5" height="10" rx="2" fill="var(--accent)" opacity="0.3" />
                </motion.g>

                {/* Plant */}
                <motion.g
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <rect x="600" y="50" width="50" height="90" rx="2" fill="var(--accent)" opacity="0.1" stroke="var(--accent)" strokeWidth="1" />

                    {/* Plant pot */}
                    <rect x="610" y="110" width="30" height="20" rx="1" fill="var(--accent)" opacity="0.2" />

                    {/* Plant stems and leaves - simplified */}
                    <path d="M625 110 C635 100, 640 80, 635 70" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
                    <path d="M625 110 C615 100, 610 80, 615 70" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
                    <path d="M625 110 C635 90, 645 85, 650 75" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
                    <path d="M625 110 C615 90, 605 85, 600 75" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />

                    {/* Falling leaf */}
                    <motion.path
                        d="M640 90 C645 95, 650 100, 645 105"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="1"
                        opacity="0.3"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 0.3 }}
                        transition={{
                            delay: 1.5,
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "loop"
                        }}
                    />
                </motion.g>

                {/* "The Web is Better When It's Weird" Frame */}
                <motion.g
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    <rect x="520" y="170" width="100" height="70" rx="2" fill="var(--accent)" opacity="0.1" stroke="var(--accent)" strokeWidth="1" />
                    <text x="570" y="200" textAnchor="middle" fill="var(--accent)" fontSize="9" opacity="0.7">THE WEB IS BETTER</text>
                    <text x="570" y="215" textAnchor="middle" fill="var(--accent)" fontSize="9" opacity="0.7">WHEN IT'S WEIRD</text>
                </motion.g>

                {/* Yoda Frame */}
                <motion.g
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <rect x="520" y="250" width="100" height="70" rx="2" fill="var(--accent)" opacity="0.1" stroke="var(--accent)" strokeWidth="1" />

                    {/* Simple character silhouette */}
                    <circle cx="570" cy="275" r="10" fill="var(--accent)" opacity="0.2" />
                    <ellipse cx="560" cy="270" rx="5" ry="8" fill="var(--accent)" opacity="0.2" />
                    <ellipse cx="580" cy="270" rx="5" ry="8" fill="var(--accent)" opacity="0.2" />
                    <rect x="565" y="285" width="10" height="15" rx="2" fill="var(--accent)" opacity="0.2" />
                </motion.g>

                {/* Blog Notes (clickable - Blog) */}
                <motion.g
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    onClick={() => router.push('/blog')}
                    className="cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                >
                    <rect x="150" y="170" width="120" height="150" rx="3" fill="var(--accent)" opacity="0.1" stroke="var(--accent)" strokeWidth="1" />

                    {/* Note lines */}
                    <line x1="170" y1="190" x2="250" y2="190" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
                    <line x1="170" y1="210" x2="240" y2="210" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
                    <line x1="170" y1="230" x2="245" y2="230" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
                    <line x1="170" y1="250" x2="230" y2="250" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
                    <line x1="170" y1="270" x2="240" y2="270" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />

                    <text x="210" y="330" textAnchor="middle" fill="var(--accent)" fontSize="12" opacity="0.7">Thoughts</text>
                </motion.g>

                {/* Camera/Projects (clickable - Projects) */}
                <motion.g
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                    onClick={() => router.push('/projects')}
                    className="cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                >
                    <rect x="300" y="50" width="120" height="90" rx="3" fill="var(--accent)" opacity="0.1" stroke="var(--accent)" strokeWidth="1" />

                    {/* Camera body - simplified */}
                    <rect x="330" y="70" width="60" height="40" rx="5" fill="var(--accent)" opacity="0.2" />

                    {/* Lens */}
                    <circle cx="360" cy="90" r="15" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="1" />
                    <circle cx="360" cy="90" r="8" fill="var(--accent)" opacity="0.2" />

                    <text x="360" y="130" textAnchor="middle" fill="var(--accent)" fontSize="12" opacity="0.7">Archive</text>
                </motion.g>

                {/* Dr Pepper Can */}
                <motion.g
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                >
                    <rect x="450" y="50" width="40" height="90" rx="2" fill="var(--accent)" opacity="0.1" stroke="var(--accent)" strokeWidth="1" />

                    {/* Can */}
                    <rect x="455" y="60" width="30" height="50" rx="3" fill="var(--accent)" opacity="0.2" />
                    <rect x="455" y="60" width="30" height="10" rx="3" fill="var(--accent)" opacity="0.3" />
                    <rect x="455" y="100" width="30" height="10" rx="3" fill="var(--accent)" opacity="0.3" />

                    {/* Simple label */}
                    <rect x="460" y="75" width="20" height="20" rx="1" fill="var(--background)" stroke="var(--accent)" strokeWidth="0.5" opacity="0.8" />
                    <text x="470" y="88" textAnchor="middle" fill="var(--accent)" fontSize="6" opacity="0.7">Dr</text>
                </motion.g>
            </motion.svg>
        </div>
    );
} 