"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useContent } from "../context/ContentContext";
import PlaceholderImage from "../components/placeholder-image";

export default function Blog() {
    const { content, isLoading } = useContent();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (isLoading || !isClient) {
        return (
            <div className="container mx-auto py-16 px-4 text-center">
                <p>Loading blog posts...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold mb-12 text-center">Thoughts</h1>

            <div className="max-w-3xl mx-auto space-y-12">
                {content.blogPosts.map((post) => (
                    <Link href={`/blog/${post.id}`} key={post.id} className="block card hover:shadow-lg transition-shadow">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1 h-full">
                                <div className="h-full relative">
                                    {post.imageUrl ? (
                                        <Image
                                            src={post.imageUrl}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <PlaceholderImage height={200} alt={post.title} />
                                    )}
                                </div>
                            </div>
                            <div className="md:col-span-2 p-6">
                                <h3 className="text-xl font-medium mb-2">{post.title}</h3>
                                <p className="text-sm opacity-60 mb-4">{post.date}</p>
                                <p className="opacity-80">{post.excerpt}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
} 