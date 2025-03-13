export default async function BlogPost({ params }: { params: { id: string } }) {
    // Sample blog data - in a real app, this would come from a database or API
    const blogPosts = {
        "first-post": {
            title: "The Web is Better When It's Weird",
            date: "2023-05-01",
            content: "The early web was a place of experimentation and personal expression. Websites weren't just functional—they were extensions of their creators' personalities. As the web has matured, we've gained consistency and usability, but sometimes at the cost of that original creative spirit. This post explores how we can bring back some of that weirdness while maintaining modern best practices."
        },
        "second-post": {
            title: "Handcrafted CSS in an Era of Frameworks",
            date: "2023-05-15",
            content: "With the rise of CSS frameworks like Tailwind and Bootstrap, it's becoming less common to write CSS from scratch. While these tools offer efficiency and consistency, there's still value in understanding and writing custom CSS. This post discusses the benefits of handcrafted CSS and when it might be the right approach for your project."
        },
        "third-post": {
            title: "Illustration as a Communication Tool",
            date: "2023-06-01",
            content: "Custom illustrations can communicate complex ideas quickly and add personality to digital products. This post explores how thoughtful illustration work can enhance user experience, reinforce brand identity, and make digital spaces more human and approachable."
        }
    };

    // Using await to satisfy Next.js requirement for dynamic routes
    const id = await Promise.resolve(params.id);
    const post = blogPosts[id as keyof typeof blogPosts];

    if (!post) {
        return <div className="container mx-auto py-16 px-4">Blog post not found</div>;
    }

    return (
        <div className="container mx-auto py-16 px-4">
            <article className="max-w-3xl mx-auto">
                <header className="mb-8">
                    <p className="text-sm opacity-60 mb-2">{post.date}</p>
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
                </header>
                <div className="prose">
                    <p>{post.content}</p>
                </div>
            </article>
        </div>
    );
}