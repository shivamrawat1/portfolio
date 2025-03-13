"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Sample blog data
const blogPosts = [
    {
        id: "first-post",
        title: "The Web is Better When It's Weird",
        excerpt: "Thoughts on keeping the internet a creative, experimental space.",
        date: "2023-05-01",
        imageUrl: "/images/blog1.jpg"
    },
    {
        id: "second-post",
        title: "Handcrafted CSS in an Era of Frameworks",
        excerpt: "Why writing custom CSS still matters in modern web development.",
        date: "2023-05-15",
        imageUrl: "/images/blog2.jpg"
    },
    {
        id: "third-post",
        title: "Illustration as a Communication Tool",
        excerpt: "How custom illustrations can enhance user experience and brand identity.",
        date: "2023-06-01",
        imageUrl: "/images/blog3.jpg"
    }
];

export default function BlogList() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="container mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold mb-12 text-center animate-fade-in">Thoughts</h1>

            <div className="space-y-12 max-w-3xl mx-auto">
                {blogPosts.map((post, index) => (
                    <div
                        key={post.id}
                        className="card p-6 animate-slide-in-right"
                        style={{ animationDelay: `${index * 200}ms` }}
                    >
                        <p className="text-sm opacity-60 mb-2">{post.date}</p>
                        <h2 className="text-2xl font-medium mb-3">{post.title}</h2>
                        <p className="opacity-70 mb-4">{post.excerpt}</p>
                        <Link href={`/blog/${post.id}`}>
                            Read more →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
} 