"use client"

import { useState, useEffect, useRef, useMemo } from "react";
import styles from "../../styles/pages/friends.module.css";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// Define the Friend interface with link property
interface Friend {
    id: number;
    name: string;
    tags: string[];
    position: [number, number, number]; // [x, y, z]
    color?: string; // Optional color for variety
    link: string; // URL to redirect to when clicked
}

// Simple SVG placeholder creator
function createPlaceholderSVG(name: string, color: string = "#f4d06f"): string {
    // Get initials from name
    const initials = name
        .split(' ')
        .map(word => word[0] || '')
        .join('')
        .toUpperCase()
        .substring(0, 2);

    // Create SVG with dynamic initials and color
    const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="100" fill="${color}" />
      <circle cx="100" cy="70" r="30" fill="#FFF7F4" />
      <path d="M55,180 C55,120 145,120 145,180" fill="#FFF7F4" />
      <text x="100" y="105" font-family="Arial" font-size="45" font-weight="bold" fill="#000" text-anchor="middle">${initials}</text>
    </svg>
  `;

    // Convert SVG to data URL
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent.trim())}`;
}

// Node component that uses SVG texture
function FriendNode({ friend, isVisible, onClick }: {
    friend: Friend,
    isVisible: boolean,
    onClick: (link: string) => void
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Create SVG placeholder for this friend
    const svgDataUrl = useMemo(() =>
        createPlaceholderSVG(friend.name, friend.color),
        [friend.name, friend.color]
    );

    // Create texture from SVG
    const texture = useMemo(() => {
        const loader = new THREE.TextureLoader();
        return loader.load(svgDataUrl);
    }, [svgDataUrl]);

    // Simple animation
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 0.5) * 0.005;
        }
    });

    if (!isVisible) return null;

    return (
        <group position={friend.position}>
            <mesh
                ref={meshRef}
                onClick={() => onClick(friend.link)}
                onPointerOver={() => document.body.style.cursor = 'pointer'}
                onPointerOut={() => document.body.style.cursor = 'default'}
            >
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial map={texture} />
            </mesh>
            <Html distanceFactor={10} position={[0, -1.5, 0]} className={styles.node_label}>
                <div className={styles.friend_name}>{friend.name}</div>
                <div className={styles.friend_tags}>
                    {friend.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>#{tag}</span>
                    ))}
                </div>
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
    // Create a reference for positioning - moved before conditional return
    const groupRef = useRef<THREE.Group>(null);

    // Calculate midpoint
    const midX = (start[0] + end[0]) / 2;
    const midY = (start[1] + end[1]) / 2;
    const midZ = (start[2] + end[2]) / 2;

    // Calculate distance between points
    const distance = Math.sqrt(
        Math.pow(end[0] - start[0], 2) +
        Math.pow(end[1] - start[1], 2) +
        Math.pow(end[2] - start[2], 2)
    );

    // Position and orient the cylinder on mount and when props change - moved before conditional return
    useEffect(() => {
        if (groupRef.current) {
            // Position at midpoint
            groupRef.current.position.set(midX, midY, midZ);

            // Calculate direction vector
            const direction = new THREE.Vector3(
                end[0] - start[0],
                end[1] - start[1],
                end[2] - start[2]
            ).normalize();

            // Default cylinder orientation is along y-axis
            const yAxis = new THREE.Vector3(0, 1, 0);

            // Get the quaternion that rotates y-axis to match our direction
            const quaternion = new THREE.Quaternion();
            quaternion.setFromUnitVectors(yAxis, direction);

            // Apply the rotation
            groupRef.current.setRotationFromQuaternion(quaternion);
        }
    }, [start, end, midX, midY, midZ]);

    if (!visible) return null;

    return (
        <group ref={groupRef}>
            <mesh>
                <cylinderGeometry args={[0.05, 0.05, distance, 8]} />
                <meshBasicMaterial color="#f4d06f" opacity={0.4} transparent={true} />
            </mesh>
        </group>
    );
}

// Main scene component
function Scene({ friends, selectedTags }: { friends: Friend[], selectedTags: string[] }) {
    // Filter friends based on selected tags
    const visibleFriends = friends.map(friend => {
        // If no tags selected, show all friends
        if (selectedTags.length === 0) return { ...friend, visible: true };

        // Check if friend has at least one of the selected tags
        const hasTag = selectedTags.some(tag => friend.tags.includes(tag));
        return { ...friend, visible: hasTag };
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
            window.open(link, '_blank');
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

export default function FriendsPage() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [allTags, setAllTags] = useState<string[]>([]);

    // Color palette that matches the website theme
    const colorPalette = useMemo(() => {
        return ['#f4d06f', '#e28f83', '#e4c1b3', '#d8a28c', '#fceadd'];
    }, []);

    // Sample friends data with dynamically assigned colors and links
    useEffect(() => {
        const friendsData: Friend[] = [
            {
                id: 1,
                name: "Alex Johnson",
                tags: ["college", "tech", "gaming"],
                position: [-5, 0, 3],
                color: colorPalette[0],
                link: "https://github.com/alexjohnson"
            },
            {
                id: 2,
                name: "Sarah Lee",
                tags: ["design", "art", "college"],
                position: [4, 2, -2],
                color: colorPalette[1],
                link: "https://dribbble.com/sarahlee"
            },
            {
                id: 3,
                name: "Mike Chen",
                tags: ["music", "tech", "startup"],
                position: [0, -3, 5],
                color: colorPalette[2],
                link: "https://soundcloud.com/mikechen"
            },
            {
                id: 4,
                name: "Priya Patel",
                tags: ["travel", "photography", "startup"],
                position: [6, 0, 0],
                color: colorPalette[3],
                link: "https://instagram.com/priyapatel"
            },
            {
                id: 5,
                name: "David Kim",
                tags: ["sports", "gaming", "college"],
                position: [-3, 4, -3],
                color: colorPalette[4],
                link: "https://twitch.tv/davidkim"
            },
            {
                id: 6,
                name: "Emma Wilson",
                tags: ["art", "music", "writing"],
                position: [2, -2, -6],
                color: colorPalette[0],
                link: "https://medium.com/@emmawilson"
            },
            {
                id: 7,
                name: "Carlos Rodriguez",
                tags: ["tech", "startup", "travel"],
                position: [-6, -1, -2],
                color: colorPalette[1],
                link: "https://linkedin.com/in/carlosrodriguez"
            },
            // Additional nodes
            {
                id: 8,
                name: "Lena Park",
                tags: ["fashion", "photography", "travel"],
                position: [5, -5, 1],
                color: colorPalette[2],
                link: "https://pinterest.com/lenapark"
            },
            {
                id: 9,
                name: "Tom Wilson",
                tags: ["tech", "gaming", "movies"],
                position: [-2, 1, 6],
                color: colorPalette[3],
                link: "https://twitter.com/tomwilson"
            },
            {
                id: 10,
                name: "Jasmine Chu",
                tags: ["food", "travel", "photography"],
                position: [3, 5, 2],
                color: colorPalette[4],
                link: "https://instagram.com/jasmine.chu"
            },
            {
                id: 11,
                name: "Raj Patel",
                tags: ["finance", "tech", "startup"],
                position: [-4, -4, -3],
                color: colorPalette[0],
                link: "https://linkedin.com/in/rajpatel"
            },
            {
                id: 12,
                name: "Sophie Brown",
                tags: ["science", "books", "tech"],
                position: [7, 2, -4],
                color: colorPalette[1],
                link: "https://researchgate.net/profile/sophiebrown"
            },
            {
                id: 13,
                name: "Daniel Garcia",
                tags: ["music", "art", "photography"],
                position: [0, 6, -4],
                color: colorPalette[2],
                link: "https://spotify.com/artist/danielgarcia"
            },
            {
                id: 14,
                name: "Maya Johnson",
                tags: ["design", "fashion", "art"],
                position: [-7, 3, 0],
                color: colorPalette[3],
                link: "https://behance.net/mayajohnson"
            },
            {
                id: 15,
                name: "Kai Zhang",
                tags: ["tech", "science", "gaming"],
                position: [4, -3, -5],
                color: colorPalette[4],
                link: "https://github.com/kaizhang"
            }
        ];

        setFriends(friendsData);

        // Extract all unique tags
        const tags = Array.from(new Set(friendsData.flatMap(friend => friend.tags)));
        setAllTags(tags);
    }, [colorPalette]);

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
                    <p className={styles.info_text}>Click on a friend node to visit their page</p>
                </div>
            </div>
        </div>
    );
}