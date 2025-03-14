"use client";

import { useEffect, useState } from "react";
import { useContent } from "../../context/ContentContext";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function BlogPost() {
    const { content, isLoading } = useContent();
    const [isClient, setIsClient] = useState(false);
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (isLoading || !isClient) {
        return (
            <div className="container mx-auto py-16 px-4 text-center">
                <p>Loading blog post...</p>
            </div>
        );
    }

    const post = content.blogPosts.find(p => p.id === id);

    if (!post) {
        return (
            <div className="container mx-auto py-16 px-4 text-center">
                <h1 className="text-3xl font-bold mb-8">Blog Post Not Found</h1>
                <p className="mb-8">The blog post you're looking for doesn't exist.</p>
                <Link href="/blog" className="btn">
                    Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-sm opacity-60 mb-8">{post.date}</p>

            <div className="prose max-w-none opacity-80">
                {post.content ? (
                    <p>{post.content}</p>
                ) : (
                    <p>{post.excerpt}</p>
                )}
            </div>
        </div>
    );
}