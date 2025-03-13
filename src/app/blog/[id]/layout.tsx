import Link from "next/link";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container mx-auto py-16 px-4">
            <Link href="/blog" className="opacity-70 hover:opacity-100 mb-8 inline-block">
                ← Back to Thoughts
            </Link>
            <div className="mt-6">
                {children}
            </div>
        </div>
    );
}