"use client";

import { useContent } from "../context/ContentContext";
import { useRouter } from "next/navigation";

export default function EditModeToggle() {
    const { isEditMode, setIsEditMode, refreshContent } = useContent();
    const router = useRouter();

    const toggleEditMode = () => {
        if (isEditMode) {
            // If we're exiting edit mode, refresh content and go to home
            refreshContent().then(() => {
                setIsEditMode(false);
                router.push('/');
            });
        } else {
            // Enter edit mode
            setIsEditMode(true);
            router.push('/edit');
        }
    };

    return (
        <button
            onClick={toggleEditMode}
            className="fixed bottom-4 right-4 z-50 bg-accent text-secondary px-4 py-2 rounded-full shadow-lg hover:opacity-90 transition-opacity"
        >
            {isEditMode ? "Save & Exit" : "Edit Content"}
        </button>
    );
} 