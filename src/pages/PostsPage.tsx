import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, createPost, updatePost, deletePost } from "../api";
import CreatePostForm from "../components/CreatePostForm";
import PostList from "../components/PostList";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import type { Post } from "../types";

interface PostsResponse {
    results: Post[];
}

interface ModalState {
    isEditOpen: boolean;
    isDeleteOpen: boolean;
    selectedPost: Post | null;
}

const usePostMutations = () => {
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

    return { createMutation, updateMutation, deleteMutation };
};


export default function PostsPage() {
    const [modalState, setModalState] = useState<ModalState>({
        isEditOpen: false,
        isDeleteOpen: false,
        selectedPost: null,
    });

    const username: string = sessionStorage.getItem("username") || "";
    const { createMutation, updateMutation, deleteMutation } = usePostMutations();

    const { data: postsResponse, isLoading, error } = useQuery<PostsResponse>({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    const openEditModal = useCallback((post: Post) => {
        setModalState({ isEditOpen: true, isDeleteOpen: false, selectedPost: post });
    }, []);

    const openDeleteModal = useCallback((post: Post) => {
        setModalState({ isEditOpen: false, isDeleteOpen: true, selectedPost: post });
    }, []);

    const closeModals = useCallback(() => {
        setModalState({ isEditOpen: false, isDeleteOpen: false, selectedPost: null });
    }, []);

    const handleCreatePost = useCallback(
        (postData: Omit<Post, "id" | "created_datetime">) => {
            createMutation.mutate(postData);
        },
        [createMutation]
    );

    const handleSaveEdit = useCallback(
        (updatedPost: Partial<Post>) => {
            if (modalState.selectedPost) {
                updateMutation.mutate(
                    { id: modalState.selectedPost.id, data: updatedPost },
                    { onSuccess: () => closeModals() }
                );
            }
        },
        [modalState.selectedPost, updateMutation, closeModals]
    );

    const handleConfirmDelete = useCallback(() => {
        if (modalState.selectedPost) {
            deleteMutation.mutate(modalState.selectedPost.id, {
                onSuccess: () => closeModals(),
            });
        }
    }, [modalState.selectedPost, deleteMutation, closeModals]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    
    if (error)
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                Error fetching posts: {error.message}
            </div>
        );

    return (
        <main className="min-h-screen bg-gray-100">
            <div className="max-w-[800px] bg-white mx-auto">
                <header className="h-20 bg-primary text-white flex items-center justify-between ps-9">
                    <h1 className="text-xl font-bold">CodeLeap Network</h1>
                </header>

                <section aria-label="Create a new post">
                    <CreatePostForm
                        username={username}
                        onSubmit={handleCreatePost}
                    />
                </section>

                <section aria-label="Posts list">
                    <PostList
                        posts={postsResponse?.results || []}
                        currentUsername={username}
                        onEditPost={openEditModal}
                        onDeletePost={openDeleteModal}
                    />
                </section>

                {modalState.isDeleteOpen && modalState.selectedPost && (
                    <DeleteModal
                        post={modalState.selectedPost}
                        onClose={closeModals}
                        onDelete={handleConfirmDelete}
                    />
                )}

                {modalState.isEditOpen && modalState.selectedPost && (
                    <EditModal
                        post={modalState.selectedPost}
                        onClose={closeModals}
                        onSave={handleSaveEdit}
                    />
                )}
            </div>
        </main>
    );
}