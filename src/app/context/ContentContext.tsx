import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for our content
export interface Project {
    id: string;
    title: string;
    description: string;
    fullDescription?: string;
    technologies?: string[];
    imageUrl: string;
    link: string;
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content?: string;
    date: string;
    imageUrl?: string;
}

export interface AboutContent {
    paragraphs: string[];
}

export interface HomeContent {
    heroTitle: string;
    heroSubtitle: string;
}

export interface PortfolioContent {
    projects: Project[];
    blogPosts: BlogPost[];
    about: AboutContent;
    home: HomeContent;
}

interface ContentContextType {
    content: PortfolioContent;
    isLoading: boolean;
    error: string | null;
    isEditMode: boolean;
    setIsEditMode: (mode: boolean) => void;
    updateContent: (newContent: Partial<PortfolioContent>) => Promise<void>;
    refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
    const [content, setContent] = useState<PortfolioContent>({
        projects: [],
        blogPosts: [],
        about: { paragraphs: [] },
        home: { heroTitle: '', heroSubtitle: '' }
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const fetchContent = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/content');
            if (!response.ok) {
                throw new Error('Failed to fetch content');
            }
            const data = await response.json();
            setContent(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            console.error('Error fetching content:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateContent = async (newContent: Partial<PortfolioContent>) => {
        try {
            const response = await fetch('/api/content', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContent),
            });

            if (!response.ok) {
                throw new Error('Failed to update content');
            }

            // Update local state with the new content
            setContent(prev => ({
                ...prev,
                ...newContent
            }));

            return await response.json();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            console.error('Error updating content:', err);
            throw err;
        }
    };

    const refreshContent = async () => {
        await fetchContent();
    };

    useEffect(() => {
        fetchContent();
    }, []);

    return (
        <ContentContext.Provider
            value={{
                content,
                isLoading,
                error,
                isEditMode,
                setIsEditMode,
                updateContent,
                refreshContent
            }}
        >
            {children}
        </ContentContext.Provider>
    );
}

export function useContent() {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
} 