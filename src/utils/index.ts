import type { FilterType, Post, SortOption } from "../types";

export function formatTimeAgo(date: string): string {
    const now = new Date();
    const past = new Date(date);

    const diffInMs = now.getTime() - past.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);

    if (diffInSeconds < 60) {
        return diffInSeconds <= 0
            ? "just now"
            : `${diffInSeconds} ${diffInSeconds === 1 ? "second" : "seconds"} ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
}

export const filterAndSortPosts = (
    posts: Post[] | undefined,
    sortOption: SortOption,
    filterType: FilterType,
    filterValue: string,
    likeCounts: { [key: number]: number },
): Post[] => {
    let filteredPosts = posts || [];

    // Apply filtering
    if (filterValue.trim()) {
        const lowerFilter = filterValue.toLowerCase();
        filteredPosts = filteredPosts.filter((post) => {
            if (filterType === "username") {
                return post.username.toLowerCase().includes(lowerFilter);
            } else if (filterType === "content") {
                return (
                    post.title.toLowerCase().includes(lowerFilter) ||
                    post.content.toLowerCase().includes(lowerFilter)
                );
            } else {
                // all
                return (
                    post.username.toLowerCase().includes(lowerFilter) ||
                    post.title.toLowerCase().includes(lowerFilter) ||
                    post.content.toLowerCase().includes(lowerFilter)
                );
            }
        });
    }

    // Apply sorting
    return [...filteredPosts].sort((a, b) => {
        if (sortOption === "most-liked") {
            const likesA = likeCounts[a.id] || 0;
            const likesB = likeCounts[b.id] || 0;
            return likesB - likesA; // Highest likes first
        }
        const dateA = new Date(a.created_datetime).getTime();
        const dateB = new Date(b.created_datetime).getTime();
        return sortOption === "newest" ? dateB - dateA : dateA - dateB;
    });
};
