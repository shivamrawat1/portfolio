"use client"

import { useState, useEffect, useRef, useMemo } from "react";
import styles from "../../styles/pages/friends.module.css";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { friendsData } from "../../friendsdata/data";

// Define the Friend interface with link property
interface Friend {
    id: number;
    name: string;
    tags: string[];
    position: [number, number, number]; // [x, y, z]
    color?: string; // Optional color for variety
    link: string; // URL to redirect to when clicked
    image: string; // Image URL
}

// Node component that uses SVG texture
function FriendNode({ friend, isVisible, onClick }: {
    friend: Friend,
    isVisible: boolean,
    onClick: (link: string) => void
}) {
    const groupRef = useRef<THREE.Group>(null);

    // Simple animation
    useFrame((state) => {
        if (groupRef.current) {
            const baseY = friend.position[1];
            groupRef.current.position.y = baseY + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    if (!isVisible) return null;

    return (
        <group ref={groupRef} position={friend.position}>
            <Html
                distanceFactor={10}
                position={[0, 0, 0]}
                className={styles.node_label}
                style={{ pointerEvents: 'auto' }}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { document.body.style.cursor = 'default'; }}
            >
                <a
                    href={friend.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                >
                    <div style={{ display: 'flex', alignItems: 'stretch', width: '280px', background: '#fff7f4', border: '1px solid #ead9d1', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                        <img src={friend.image} alt={friend.name} style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px', width: '50%' }}>
                            <div className={styles.friend_name}>{friend.name}</div>
                            <div className={styles.friend_tags}>
                                {friend.tags.map((tag, index) => (
                                    <span key={index} className={styles.tag}>#{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </a>
            </Html>
        </group>
    );
}

// Connection component
function ConnectionLine({ start, end, visible }: {
    start: [number, number, number],
    end: [number, number, number],
    visible: boolean
}) {
    if (!visible) return null;

    return (
        <Line
            points={[start, end]}
            color="#f4d06f"
            transparent
            opacity={0.6}
        />
    );
}

// Main scene component
function Scene({ friends, selectedTags }: { friends: Friend[], selectedTags: string[] }) {
    // Filter friends based on selected tags
    const visibleFriends = friends.map(friend => {
        // If no tags selected, show all friends
        if (selectedTags.length === 0) return { ...friend, visible: true };

        // Show a friend if they have ANY of the selected tags (OR logic)
        const hasAnySelectedTag = selectedTags.some(tag => friend.tags.includes(tag));
        return { ...friend, visible: hasAnySelectedTag };
    });

    // Create connections between nodes based on shared tags
    const connections = [];
    for (let i = 0; i < friends.length; i++) {
        for (let j = i + 1; j < friends.length; j++) {
            // Find shared tags between the two friends
            const sharedTags = friends[i].tags.filter(tag =>
                friends[j].tags.includes(tag)
            );

            // Create connection if they share at least one tag
            if (sharedTags.length > 0) {
                connections.push({
                    id: `${friends[i].id}-${friends[j].id}`,
                    start: friends[i].position,
                    end: friends[j].position,
                    visible: visibleFriends[i].visible && visibleFriends[j].visible,
                    sharedTags: sharedTags
                });
            }
        }
    }

    // Handle clicking on a friend node - redirect to the specified link
    const handleNodeClick = (link: string) => {
        if (link) {
            window.location.href = link;
        }
    };

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            {visibleFriends.map(friend => (
                <FriendNode
                    key={friend.id}
                    friend={friend}
                    isVisible={friend.visible}
                    onClick={handleNodeClick}
                />
            ))}

            {connections.map(connection => (
                <ConnectionLine
                    key={connection.id}
                    start={connection.start}
                    end={connection.end}
                    visible={connection.visible}
                />
            ))}

            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                minDistance={5}
                maxDistance={30}
            />
        </>
    );
}

// Distribute points on a sphere for even spacing with slight jitter
function generateFibonacciPosition(index: number, total: number, radius: number = 7): [number, number, number] {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const t = index + 0.5;
    const y = 1 - (t * 2) / total; // from 1 to -1
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * t;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    // small random jitter so layout isn't too rigid
    const jitter = 0.35;
    const jx = (Math.random() - 0.5) * jitter;
    const jy = (Math.random() - 0.5) * jitter;
    const jz = (Math.random() - 0.5) * jitter;

    return [
        (x + jx) * radius,
        (y + jy) * radius,
        (z + jz) * radius
    ];
}

export default function FriendsPage() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [allTags, setAllTags] = useState<string[]>([]);

    // Sample friends data with dynamically assigned colors and links
    useEffect(() => {
        const base = friendsData as unknown as Omit<Friend, 'position'>[];
        const positioned: Friend[] = base.map((f, i) => ({
            id: f.id,
            name: f.name,
            tags: f.tags,
            color: f.color,
            link: f.link,
            image: (f as any).image,
            position: generateFibonacciPosition(i, base.length)
        }));
        setFriends(positioned);

        // Extract all unique tags
        const tags = Array.from(new Set(base.flatMap(friend => friend.tags)));
        setAllTags(tags);
    }, []);

    // Toggle tag selection
    const toggleTag = (tag: string) => {
        setSelectedTags(prevTags =>
            prevTags.includes(tag)
                ? prevTags.filter(t => t !== tag)
                : [...prevTags, tag]
        );
    };

    // Clear all selected tags
    const clearFilters = () => {
        setSelectedTags([]);
    };

    return (
        <div className={styles.friends_container}>
            <div className={styles.visualization_container}>
                <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                    <Scene friends={friends} selectedTags={selectedTags} />
                </Canvas>
            </div>

            <div className={styles.filter_sidebar}>
                <div className={styles.filter_header}>
                    <h3>Filter by Tags</h3>
                    {selectedTags.length > 0 && (
                        <button
                            className={styles.clear_filter}
                            onClick={clearFilters}
                        >
                            Clear
                        </button>
                    )}
                </div>

                <div className={styles.tags_container}>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            className={`${styles.tag_button} ${selectedTags.includes(tag) ? styles.selected : ''}`}
                            onClick={() => toggleTag(tag)}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>

                <div className={styles.friend_info}>
                    <p className={styles.info_text}>Click on a friend node to visit their page. This section is currently under construction and the people are not real.</p>
                </div>
            </div>
        </div>
    );
}