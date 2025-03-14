"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const pathname = usePathname();

    const getLinkClass = (path: string) => {
        const isActive = pathname === path ||
            (path !== '/' && pathname.startsWith(path));
        return isActive
            ? "text-accent font-medium"
            : "text-accent opacity-70 hover:opacity-100";
    };

    return (
        <div className="flex-1">
            <div className="flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">Portfolio</Link>
                <nav className="flex gap-8">
                    <Link href="/" className={getLinkClass('/')}>Home</Link>
                    <Link href="/about" className={getLinkClass('/about')}>About</Link>
                    <Link href="/blog" className={getLinkClass('/blog')}>Blogs</Link>
                    <Link href="/projects" className={getLinkClass('/projects')}>Projects</Link>
                </nav>
            </div>
        </div>
    );
}