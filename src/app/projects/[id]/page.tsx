import Image from "next/image";
import Link from "next/link";

// Sample project data
const projects = [
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
    // Add more projects as needed
];

export default async function ProjectDetail({ params }: { params: { id: string } }) {
    // Using await to satisfy Next.js requirement for dynamic routes
    const id = await Promise.resolve(params.id);
    const project = projects.find(p => p.id === id);

    if (!project) {
        return <div className="container mx-auto py-16 px-4">Project not found</div>;
    }

    return (
        <div className="container mx-auto py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/projects" className="inline-block mb-6">
                        ← Back to Projects
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
                </div>

                <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-accent opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-foreground">Image placeholder</p>
                    </div>
                </div>

                <div className="prose max-w-none mb-8">
                    <p>{project.fullDescription}</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-medium mb-4">Technologies Used</h2>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                            <span key={index} className="px-3 py-1 bg-accent bg-opacity-10 rounded-full text-sm">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 