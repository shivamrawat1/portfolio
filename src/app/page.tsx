"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DesktopIllustration from "./components/desktop-illustration";
import ThemeSelector from "./components/theme-selector";
import PlaceholderImage from "./components/placeholder-image";

// Sample data
const featuredProjects = [
  {
    id: 1,
    title: "Niche Web Project",
    description: "A custom web application with handcrafted CSS and unique illustrations.",
    imageUrl: "/images/project1.jpg",
    link: "/projects/1"
  },
  {
    id: 2,
    title: "CSS Experiment",
    description: "Exploring the boundaries of what's possible with modern CSS techniques.",
    imageUrl: "/images/project2.jpg",
    link: "/projects/2"
  },
  {
    id: 3,
    title: "Illustration Work",
    description: "Custom illustrations for digital platforms and print media.",
    imageUrl: "/images/project3.jpg",
    link: "/projects/3"
  }
];

const recentPosts = [
  {
    id: "first-post",
    title: "The Web is Better When It's Weird",
    excerpt: "Thoughts on keeping the internet a creative, experimental space.",
    date: "2023-06-01",
    link: "/blog/first-post"
  }
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-16 px-4">
      {/* Theme selector */}
      <ThemeSelector />

      {/* Hero Section */}
      <div className="mb-16 max-w-3xl mx-auto text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Niche web projects, illustration, & handcrafted CSS
        </h1>
        <p className="text-xl opacity-80 mb-10 leading-relaxed animate-slide-up animate-delay-200">
          Creating unique digital experiences with attention to detail and a focus on creativity.
        </p>
      </div>

      {/* Desktop Illustration */}
      <DesktopIllustration />

      <div className="flex justify-center gap-4 animate-slide-up animate-delay-300 mb-24">
        <button
          onClick={() => router.push('/projects')}
          className="btn"
        >
          View Archive
        </button>
        <button
          onClick={() => router.push('/blog')}
          className="btn btn-outline"
        >
          Read Thoughts
        </button>
      </div>

      {/* Featured Projects Section */}
      <div className="mb-24 animate-fade-in animate-delay-400">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Selected Work</h2>
          <Link href="/projects" className="opacity-70 hover:opacity-100">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <div key={project.id} className={`card p-4 animate-slide-up animate-delay-${(index + 1) * 100}`}>
              <div className="relative h-48 w-full image-container">
                <PlaceholderImage
                  width={400}
                  height={200}
                  className="w-full h-full"
                  alt={project.title}
                />
              </div>
              <h3 className="text-lg font-medium mb-2">{project.title}</h3>
              <p className="opacity-70 mb-4 text-sm">{project.description}</p>
              <Link href={project.link} className="text-sm">
                View Project →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Blog Posts Section */}
      <div className="animate-fade-in animate-delay-500">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Recent Thoughts</h2>
          <Link href="/blog" className="opacity-70 hover:opacity-100">
            View all →
          </Link>
        </div>

        <div className="space-y-6">
          {recentPosts.map((post) => (
            <div key={post.id} className="card p-6 animate-slide-in-right">
              <p className="text-sm opacity-60 mb-2">{post.date}</p>
              <h3 className="text-xl font-medium mb-3">{post.title}</h3>
              <p className="opacity-70 mb-4">{post.excerpt}</p>
              <Link href={post.link}>
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
