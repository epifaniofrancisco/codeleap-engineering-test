import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updatePost, deletePost } from "../api";
import type { Post } from "../types";

export const usePostMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error: Error) => {
            alert(`Failed to create post: ${error.message}`);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Post> }) =>
            updatePost(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error: Error) => {
            alert(`Failed to update post: ${error.message}`);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error: Error) => {
            alert(`Failed to delete post: ${error.message}`);
        },
    });

    const likeMutation = useMutation({
        mutationFn: async (postId: number) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const likes = JSON.parse(localStorage.getItem("postLikes") || "{}");
            likes[postId] = (likes[postId] || 0) + 1;
            localStorage.setItem("postLikes", JSON.stringify(likes));
            return { postId, likeCount: likes[postId] };
        },
        onSuccess: ({ postId, likeCount }) => {
            queryClient.setQueryData(["postLikes", postId], likeCount);
        },
        onError: (error: Error) => {
            alert(`Failed to like post: ${error.message}`);
        },
    });

    return { createMutation, updateMutation, deleteMutation, likeMutation };
};
