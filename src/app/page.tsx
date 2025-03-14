"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DesktopIllustration from "./components/desktop-illustration";
import ThemeSelector from "./components/theme-selector";
import PlaceholderImage from "./components/placeholder-image";
import { useContent } from "./context/ContentContext";

export default function Home() {
  const router = useRouter();
  const { content, isLoading } = useContent();

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <p>Loading content...</p>
      </div>
    );
  }

  // Get featured projects (first 3)
  const featuredProjects = content.projects.slice(0, 3);

  // Get recent posts (first 1)
  const recentPosts = content.blogPosts.slice(0, 1);

  return (
    <div className="container mx-auto py-16 px-4">
      {/* Theme selector */}
      <ThemeSelector />

      {/* Hero Section */}
      <div className="mb-16 max-w-3xl mx-auto text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {content.home.heroTitle}
        </h1>
        <p className="text-xl opacity-80 mb-10 leading-relaxed animate-slide-up animate-delay-200">
          {content.home.heroSubtitle}
        </p>
      </div>

      {/* Desktop Illustration */}
      <DesktopIllustration />
    </div>
  );
}
