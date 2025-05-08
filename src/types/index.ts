export interface Post {
    id: number;
    username: string;
    created_datetime: string;
    title: string;
    content: string;
}

export interface PostFormData {
    username: string;
    title: string;
    content: string;
}

export type SortOption = "newest" | "oldest" | "most-liked";
export type FilterType = "all" | "username" | "content";
