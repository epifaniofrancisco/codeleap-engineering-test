import axios from "axios";
import type { Post } from "../types";

interface PostsResponse {
    results: Post[];
}

const api = axios.create({
    baseURL: "https://dev.codeleap.co.uk/careers/",
});

export const fetchPosts = async (): Promise<PostsResponse> => {
    try {
        const { data } = await api.get<PostsResponse>("/");
        return data;
    } catch (error) {
        throw new Error("Failed to fetch posts");
    }
};

export const createPost = async (
    postData: Omit<Post, "id" | "created_datetime">,
): Promise<Post> => {
    try {
        const { data } = await api.post<Post>("/", postData);
        return data;
    } catch (error) {
        throw new Error("Failed to create post");
    }
};

export const updatePost = async (
    id: number,
    postData: Partial<Post>,
): Promise<Post> => {
    try {
        const { data } = await api.patch<Post>(`${id}/`, postData);
        return data;
    } catch (error) {
        throw new Error("Failed to update post");
    }
};

export const deletePost = async (id: number): Promise<void> => {
    try {
        await api.delete(`${id}/`);
    } catch (error) {
        throw new Error("Failed to delete post");
    }
};
