import { NextResponse } from 'next/server';

// This is a placeholder - in a real app, you would fetch from your database
// For now, we'll use the hardcoded data as a starting point
const initialContent = {
    projects: [
        {
            id: "1",
            title: "Niche Web Project",
            description: "A custom web application with handcrafted CSS and unique illustrations.",
            fullDescription: "This project was built for a client in the education sector who wanted a distinctive online presence. I created custom illustrations and animations to bring their brand to life, and wrote bespoke CSS to ensure the site stood out from template-based competitors.",
            technologies: ["React", "CSS", "SVG Animation"],
            imageUrl: "/images/project1.jpg",
            link: "/projects/1"
        },
        {
            id: "2",
            title: "CSS Experiment",
            description: "Exploring the boundaries of what's possible with modern CSS techniques.",
            fullDescription: "This experimental project explores the capabilities of modern CSS, including grid layouts, custom properties, and animations. It demonstrates how powerful CSS has become and how many effects that once required JavaScript can now be achieved with CSS alone.",
            technologies: ["HTML", "CSS", "CSS Grid", "CSS Animations"],
            imageUrl: "/images/project2.jpg",
            link: "/projects/2"
        },
        {
            id: "3",
            title: "Illustration Work",
            description: "Custom illustrations for digital platforms and print media.",
            imageUrl: "/images/project3.jpg",
            link: "/projects/3"
        }
    ],
    blogPosts: [
        {
            id: "first-post",
            title: "The Web is Better When It's Weird",
            excerpt: "Thoughts on keeping the internet a creative, experimental space.",
            content: "The early web was a place of experimentation and personal expression. Websites weren't just functional—they were extensions of their creators' personalities. As the web has matured, we've gained consistency and usability, but sometimes at the cost of that original creative spirit. This post explores how we can bring back some of that weirdness while maintaining modern best practices.",
            date: "2023-05-01",
            imageUrl: "/images/blog1.jpg"
        },
        {
            id: "second-post",
            title: "Handcrafted CSS in an Era of Frameworks",
            excerpt: "Why writing custom CSS still matters in modern web development.",
            content: "With the rise of CSS frameworks like Tailwind and Bootstrap, it's becoming less common to write CSS from scratch. While these tools offer efficiency and consistency, there's still value in understanding and writing custom CSS. This post discusses the benefits of handcrafted CSS and when it might be the right approach for your project.",
            date: "2023-05-15",
            imageUrl: "/images/blog2.jpg"
        },
        {
            id: "third-post",
            title: "Illustration as a Communication Tool",
            excerpt: "How custom illustrations can enhance user experience and brand identity.",
            content: "Custom illustrations can communicate complex ideas quickly and add personality to digital products. This post explores how thoughtful illustration work can enhance user experience, reinforce brand identity, and make digital spaces more human and approachable.",
            date: "2023-06-01",
            imageUrl: "/images/blog3.jpg"
        }
    ],
    about: {
        paragraphs: [
            "I'm a designer and developer focused on creating unique digital experiences. My work spans web development, illustration, and CSS experimentation.",
            "I believe the web should be a place for creativity and personal expression. My projects aim to push boundaries while maintaining usability and accessibility.",
            "When I'm not coding or designing, you can find me exploring new art techniques, reading about design history, or experimenting with new web technologies."
        ]
    },
    home: {
        heroTitle: "Niche web projects, illustration, & handcrafted CSS",
        heroSubtitle: "Creating unique digital experiences with attention to detail and a focus on creativity."
    }
};

// In a real app, you would store this in a database
let portfolioContent = { ...initialContent };

export async function GET() {
    return NextResponse.json(portfolioContent);
}

export async function PUT(request: Request) {
    try {
        const updatedContent = await request.json();

        // Merge the updated content with existing content
        portfolioContent = {
            ...portfolioContent,
            ...updatedContent
        };

        return NextResponse.json(
            { message: 'Content updated successfully', content: portfolioContent },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to update content', error: String(error) },
            { status: 500 }
        );
    }
} 