"use client";

import { useState } from "react";
import { useContent, PortfolioContent } from "../context/ContentContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditPage() {
    const { content, isLoading, updateContent, setIsEditMode } = useContent();
    const [activeTab, setActiveTab] = useState<'home' | 'about' | 'projects' | 'blog'>('home');
    const router = useRouter();

    const [editedContent, setEditedContent] = useState<PortfolioContent>({ ...content });

    if (isLoading) {
        return <div className="container mx-auto py-16 px-4">Loading content...</div>;
    }

    const handleSave = async () => {
        try {
            await updateContent(editedContent);
            setIsEditMode(false);
            router.push('/');
        } catch (error) {
            console.error('Failed to save content:', error);
            alert('Failed to save content. Please try again.');
        }
    };

    const updateHomeContent = (field: keyof typeof editedContent.home, value: string) => {
        setEditedContent({
            ...editedContent,
            home: {
                ...editedContent.home,
                [field]: value
            }
        });
    };

    const updateAboutParagraph = (index: number, value: string) => {
        const newParagraphs = [...editedContent.about.paragraphs];
        newParagraphs[index] = value;

        setEditedContent({
            ...editedContent,
            about: {
                ...editedContent.about,
                paragraphs: newParagraphs
            }
        });
    };

    const addAboutParagraph = () => {
        setEditedContent({
            ...editedContent,
            about: {
                ...editedContent.about,
                paragraphs: [...editedContent.about.paragraphs, "New paragraph"]
            }
        });
    };

    const removeAboutParagraph = (index: number) => {
        const newParagraphs = [...editedContent.about.paragraphs];
        newParagraphs.splice(index, 1);

        setEditedContent({
            ...editedContent,
            about: {
                ...editedContent.about,
                paragraphs: newParagraphs
            }
        });
    };

    const updateProject = (index: number, field: keyof typeof editedContent.projects[0], value: any) => {
        const newProjects = [...editedContent.projects];
        newProjects[index] = {
            ...newProjects[index],
            [field]: value
        };

        setEditedContent({
            ...editedContent,
            projects: newProjects
        });
    };

    const addProject = () => {
        const newId = String(Math.max(0, ...editedContent.projects.map(p => parseInt(p.id))) + 1);

        setEditedContent({
            ...editedContent,
            projects: [
                ...editedContent.projects,
                {
                    id: newId,
                    title: "New Project",
                    description: "Project description",
                    imageUrl: "/images/placeholder.jpg",
                    link: `/projects/${newId}`
                }
            ]
        });
    };

    const removeProject = (index: number) => {
        const newProjects = [...editedContent.projects];
        newProjects.splice(index, 1);

        setEditedContent({
            ...editedContent,
            projects: newProjects
        });
    };

    const updateBlogPost = (index: number, field: keyof typeof editedContent.blogPosts[0], value: any) => {
        const newBlogPosts = [...editedContent.blogPosts];
        newBlogPosts[index] = {
            ...newBlogPosts[index],
            [field]: value
        };

        setEditedContent({
            ...editedContent,
            blogPosts: newBlogPosts
        });
    };

    const addBlogPost = () => {
        const newId = `post-${Date.now()}`;
        const today = new Date().toISOString().split('T')[0];

        setEditedContent({
            ...editedContent,
            blogPosts: [
                ...editedContent.blogPosts,
                {
                    id: newId,
                    title: "New Blog Post",
                    excerpt: "Blog post excerpt",
                    content: "Full blog post content goes here.",
                    date: today,
                    imageUrl: "/images/placeholder.jpg"
                }
            ]
        });
    };

    const removeBlogPost = (index: number) => {
        const newBlogPosts = [...editedContent.blogPosts];
        newBlogPosts.splice(index, 1);

        setEditedContent({
            ...editedContent,
            blogPosts: newBlogPosts
        });
    };

    const updateProjectTechnology = (projectIndex: number, techIndex: number, value: string) => {
        const newProjects = [...editedContent.projects];
        const project = newProjects[projectIndex];

        if (!project.technologies) {
            project.technologies = [];
        }

        const newTechnologies = [...project.technologies];
        newTechnologies[techIndex] = value;

        project.technologies = newTechnologies;

        setEditedContent({
            ...editedContent,
            projects: newProjects
        });
    };

    const addProjectTechnology = (projectIndex: number) => {
        const newProjects = [...editedContent.projects];
        const project = newProjects[projectIndex];

        if (!project.technologies) {
            project.technologies = [];
        }

        project.technologies = [...project.technologies, "New Technology"];

        setEditedContent({
            ...editedContent,
            projects: newProjects
        });
    };

    const removeProjectTechnology = (projectIndex: number, techIndex: number) => {
        const newProjects = [...editedContent.projects];
        const project = newProjects[projectIndex];

        if (!project.technologies) return;

        const newTechnologies = [...project.technologies];
        newTechnologies.splice(techIndex, 1);

        project.technologies = newTechnologies;

        setEditedContent({
            ...editedContent,
            projects: newProjects
        });
    };

    return (
        <div className="container mx-auto py-16 px-4">
            <div className="mb-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold">Edit Content</h1>
                <div className="space-x-4">
                    <button
                        onClick={handleSave}
                        className="btn"
                    >
                        Save Changes
                    </button>
                    <Link href="/" className="btn-outline">
                        Cancel
                    </Link>
                </div>
            </div>

            <div className="mb-8">
                <div className="flex border-b border-accent border-opacity-20">
                    <button
                        className={`py-2 px-4 ${activeTab === 'home' ? 'border-b-2 border-accent font-medium' : 'opacity-70'}`}
                        onClick={() => setActiveTab('home')}
                    >
                        Home
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === 'about' ? 'border-b-2 border-accent font-medium' : 'opacity-70'}`}
                        onClick={() => setActiveTab('about')}
                    >
                        About
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === 'projects' ? 'border-b-2 border-accent font-medium' : 'opacity-70'}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        Projects
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === 'blog' ? 'border-b-2 border-accent font-medium' : 'opacity-70'}`}
                        onClick={() => setActiveTab('blog')}
                    >
                        Blog
                    </button>
                </div>
            </div>

            {activeTab === 'home' && (
                <div className="space-y-6">
                    <h2 className="text-xl font-medium mb-4">Home Page Content</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block mb-2">Hero Title</label>
                            <input
                                type="text"
                                value={editedContent.home.heroTitle}
                                onChange={(e) => updateHomeContent('heroTitle', e.target.value)}
                                className="w-full p-2 bg-card-bg border border-card-border rounded"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Hero Subtitle</label>
                            <textarea
                                value={editedContent.home.heroSubtitle}
                                onChange={(e) => updateHomeContent('heroSubtitle', e.target.value)}
                                className="w-full p-2 bg-card-bg border border-card-border rounded h-24"
                            />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'about' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-medium">About Page Content</h2>
                        <button
                            onClick={addAboutParagraph}
                            className="btn-outline text-sm py-1"
                        >
                            Add Paragraph
                        </button>
                    </div>

                    <div className="space-y-6">
                        {editedContent.about.paragraphs.map((paragraph, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="block">Paragraph {index + 1}</label>
                                    <button
                                        onClick={() => removeAboutParagraph(index)}
                                        className="text-sm opacity-70 hover:opacity-100"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <textarea
                                    value={paragraph}
                                    onChange={(e) => updateAboutParagraph(index, e.target.value)}
                                    className="w-full p-2 bg-card-bg border border-card-border rounded h-32"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'projects' && (
                <div className="space-y-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-medium">Projects</h2>
                        <button
                            onClick={addProject}
                            className="btn-outline text-sm py-1"
                        >
                            Add Project
                        </button>
                    </div>

                    <div className="space-y-12">
                        {editedContent.projects.map((project, index) => (
                            <div key={project.id} className="card p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium">Project {index + 1}</h3>
                                    <button
                                        onClick={() => removeProject(index)}
                                        className="text-sm opacity-70 hover:opacity-100"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block mb-1">Title</label>
                                            <input
                                                type="text"
                                                value={project.title}
                                                onChange={(e) => updateProject(index, 'title', e.target.value)}
                                                className="w-full p-2 bg-card-bg border border-card-border rounded"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-1">Short Description</label>
                                            <textarea
                                                value={project.description}
                                                onChange={(e) => updateProject(index, 'description', e.target.value)}
                                                className="w-full p-2 bg-card-bg border border-card-border rounded h-24"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-1">Full Description</label>
                                            <textarea
                                                value={project.fullDescription || ''}
                                                onChange={(e) => updateProject(index, 'fullDescription', e.target.value)}
                                                className="w-full p-2 bg-card-bg border border-card-border rounded h-32"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block mb-1">Image URL</label>
                                            <input
                                                type="text"
                                                value={project.imageUrl}
                                                onChange={(e) => updateProject(index, 'imageUrl', e.target.value)}
                                                className="w-full p-2 bg-card-bg border border-card-border rounded"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-1">Link</label>
                                            <input
                                                type="text"
                                                value={project.link}
                                                onChange={(e) => updateProject(index, 'link', e.target.value)}
                                                className="w-full p-2 bg-card-bg border border-card-border rounded"
                                            />
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="block">Technologies</label>
                                                <button
                                                    onClick={() => addProjectTechnology(index)}
                                                    className="text-sm opacity-70 hover:opacity-100"
                                                >
                                                    Add Technology
                                                </button>
                                            </div>

                                            <div className="space-y-2">
                                                {project.technologies?.map((tech, techIndex) => (
                                                    <div key={techIndex} className="flex items-center space-x-2">
                                                        <input
                                                            type="text"
                                                            value={tech}
                                                            onChange={(e) => updateProjectTechnology(index, techIndex, e.target.value)}
                                                            className="flex-1 p-2 bg-card-bg border border-card-border rounded"
                                                        />
                                                        <button
                                                            onClick={() => removeProjectTechnology(index, techIndex)}
                                                            className="text-sm opacity-70 hover:opacity-100"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'blog' && (
                <div className="space-y-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-medium">Blog Posts</h2>
                        <button
                            onClick={addBlogPost}
                            className="btn-outline text-sm py-1"
                        >
                            Add Blog Post
                        </button>
                    </div>

                    <div className="space-y-12">
                        {editedContent.blogPosts.map((post, index) => (
                            <div key={post.id} className="card p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium">Blog Post {index + 1}</h3>
                                    <button
                                        onClick={() => removeBlogPost(index)}
                                        className="text-sm opacity-70 hover:opacity-100"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block mb-1">Title</label>
                                            <input
                                                type="text"
                                                value={post.title}
                                                onChange={(e) => updateBlogPost(index, 'title', e.target.value)}
                                                className="w-full p-2 bg-card-bg border border-card-border rounded"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-1">Excerpt</label>
                                            <textarea
                                                value={post.excerpt}
                                                onChange={(e) => updateBlogPost(index, 'excerpt', e.target.value)}
                                                className="w-full p-2 bg-card-bg border border-card-border rounded h-24"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-1">Date</label>
                                            <input
                                                type="date"
                                                value={post.date}
                                                onChange={(e) => updateBlogPost(index, 'date', e.target.value)}
                                                className="w-full p-2 bg-card-bg border border-card-border rounded"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block mb-1">Image URL</label>
                                            <input
                                                type="text"
                                                value={post.imageUrl || ''}
                                                onChange={(e) => updateBlogPost(index, 'imageUrl', e.target.value)}
                                                className="w-full p-2 bg-card-bg border border-card-border rounded"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-1">Full Content</label>
                                            <textarea
                                                value={post.content || ''}
                                                onChange={(e) => updateBlogPost(index, 'content', e.target.value)}
                                                className="w-full p-2 bg-card-bg border border-card-border rounded h-48"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 