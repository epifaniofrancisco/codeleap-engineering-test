import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api";
import CreatePostForm from "../components/CreatePostForm";
import PostList from "../components/PostList";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import Header from "../components/HeaderPost";
import { usePostMutations } from "../hooks/usePostMutations";
import type { Post } from "../types";
import { useNavigate } from "react-router-dom";

interface PostsResponse {
    results: Post[];
}

interface ModalState {
    isEditOpen: boolean;
    isDeleteOpen: boolean;
    selectedPost: Post | null;
}

export default function PostsPage() {
    const [modalState, setModalState] = useState<ModalState>({
        isEditOpen: false,
        isDeleteOpen: false,
        selectedPost: null,
    });
    const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({});
    const navigate = useNavigate();
    const username: string = localStorage.getItem("username") || "";
    const { createMutation, updateMutation, deleteMutation, likeMutation } = usePostMutations();

    const { data: postsResponse, isLoading, error } = useQuery<PostsResponse>({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem("postLikes") || "{}");
        setLikeCounts(storedLikes);
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem("username");
        navigate("/");
    }, [navigate]);

    const openEditModal = useCallback((post: Post) => {
        setModalState({
            isEditOpen: true,
            isDeleteOpen: false,
            selectedPost: post,
        });
    }, []);

    const openDeleteModal = useCallback((post: Post) => {
        setModalState({
            isEditOpen: false,
            isDeleteOpen: true,
            selectedPost: post,
        });
    }, []);

    const closeModals = useCallback(() => {
        setModalState({
            isEditOpen: false,
            isDeleteOpen: false,
            selectedPost: null,
        });
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

    const handleLikePost = useCallback(
        (postId: number) => {
            likeMutation.mutate(postId, {
                onSuccess: ({ postId, likeCount }) => {
                    setLikeCounts((prev) => ({ ...prev, [postId]: likeCount }));
                },
            });
        },
        [likeMutation]
    );

    if (isLoading)
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );

    if (error)
        return (
            <div className="flex min-h-screen items-center justify-center text-red-500">
                Error fetching posts: {error.message}
            </div>
        );

    return (
        <main className="min-h-screen bg-gray-100">
            <div className="mx-auto max-w-[800px] bg-white">
                <Header onLogout={handleLogout} />
                <section aria-label="Create a new post">
                    <CreatePostForm username={username} onSubmit={handleCreatePost} />
                </section>
                <section aria-label="Posts list">
                    <PostList
                        posts={postsResponse?.results || []}
                        currentUsername={username}
                        onEditPost={openEditModal}
                        onDeletePost={openDeleteModal}
                        onLikePost={handleLikePost}
                        likeCounts={likeCounts}
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
