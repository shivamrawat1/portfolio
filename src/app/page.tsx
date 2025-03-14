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
    </div>
  );
}
