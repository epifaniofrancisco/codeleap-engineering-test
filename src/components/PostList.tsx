import { memo, useCallback } from "react";
import type { Post } from "../types";
import { formatTimeAgo } from "../utils";
import EditIcon from "../assets/icons/edit.svg";
import DeleteIcon from "../assets/icons/delete.svg";
import LikeIcon from "../assets/icons/thumbs.svg"

interface PostListProps {
    posts: Post[] | null;
    currentUsername: string;
    onEditPost: (post: Post) => void;
    onDeletePost: (post: Post) => void;
    onLikePost: (postId: number) => void;
    likeCounts: { [key: number]: number };
    isLoading?: boolean;
}

interface PostItemProps {
    post: Post;
    currentUsername: string;
    onEditPost: (post: Post) => void;
    onDeletePost: (post: Post) => void;
    onLikePost: (postId: number) => void;
    likeCount: number;
}

const PostItem = memo(
    ({ post, currentUsername, onEditPost, onDeletePost, onLikePost, likeCount }: PostItemProps) => {
        const handleEdit = useCallback(() => onEditPost(post), [post, onEditPost]);
        const handleDelete = useCallback(() => onDeletePost(post), [post, onDeletePost]);
        const handleLike = useCallback(() => onLikePost(post.id), [post.id, onLikePost]);

        return (
            <article
                className="mb-6 rounded-2xl border"
                aria-labelledby={`post - title - ${ post.id } `}
            >
                <header className="bg-primary flex items-center justify-between rounded-t-lg border-gray-500 p-6 text-white">
                    <h3 id={`post - title - ${ post.id } `} className="text-lg font-semibold">
                        {post.title}
                    </h3>
                    {post.username === currentUsername && (
                        <div className="flex space-x-5">
                            <button
                                onClick={handleDelete}
                                className="focus:ring-offset-primary cursor-pointer text-white transition-opacity hover:opacity-80 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none"
                                aria-label={`Delete post titled ${ post.title } `}
                            >
                                <img
                                    src={DeleteIcon}
                                    alt="Delete icon"
                                    className="h-6 w-6 object-cover"
                                />
                            </button>
                            <button
                                onClick={handleEdit}
                                className="focus:ring-offset-primary cursor-pointer text-white transition-opacity hover:opacity-80 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none"
                                aria-label={`Edit post titled ${ post.title } `}
                            >
                                <img
                                    src={EditIcon}
                                    alt="Edit icon"
                                    className="h-6 w-6 object-cover"
                                />
                            </button>
                        </div>
                    )}
                </header>
                <div className="rounded-b-2xl bg-white p-6">
                    <div className="mb-4 flex w-full items-center justify-between text-sm text-gray-500">
                        <span className="font-medium">@{post.username}</span>
                        <span className="font-medium">{formatTimeAgo(post.created_datetime)}</span>
                    </div>
                    <p className="text-gray-700">{post.content}</p>
                    <div className="flex items-center space-x-3 mt-6">
                        <button
                            onClick={handleLike}
                            className="flex items-center text-gray-600 h-4 w-4  cursor-pointer"
                            aria-label={`Like post titled ${ post.title } `}
                        >
                            <img src={LikeIcon} alt="Like icon svg" />
                        </button>
                        <span className="text-sm text-gray-700">
                            {likeCount} {likeCount === 1 ? "Like" : "Likes"}
                        </span>
                    </div>
                </div>
            </article>
        );
    },
);

PostItem.displayName = "PostItem";

export default function PostList({
    posts,
    currentUsername,
    onEditPost,
    onDeletePost,
    onLikePost,
    likeCounts,
    isLoading = false,
}: PostListProps) {
    if (isLoading) {
        return (
            <div className="mt-6 text-center text-gray-500">
                Loading posts...
            </div>
        );
    }

    if (!posts?.length) {
        return (
            <div className="mt-6 text-center text-gray-500">
                No posts yet. Create one to get started!
            </div>
        );
    }

    return (
        <section className="m-6" aria-label="Posts list">
            {posts.map((post) => (
                <PostItem
                    key={post.id}
                    post={post}
                    currentUsername={currentUsername}
                    onEditPost={onEditPost}
                    onDeletePost={onDeletePost}
                    onLikePost={onLikePost}
                    likeCount={likeCounts[post.id] || 0}
                />
            ))}
        </section>
    );
}

PostList.displayName = "PostList";
