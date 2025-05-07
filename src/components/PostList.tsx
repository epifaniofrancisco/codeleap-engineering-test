import { memo, useCallback } from "react";
import type { Post } from "../types";
import { formatTimeAgo } from "../utils";
import EditIcon from "../assets/icons/edit.svg";
import DeleteIcon from "../assets/icons/delete.svg";

interface PostListProps {
    posts: Post[] | null;
    currentUsername: string;
    onEditPost: (post: Post) => void;
    onDeletePost: (post: Post) => void;
    isLoading?: boolean;
}

interface PostItemProps {
    post: Post;
    currentUsername: string;
    onEditPost: (post: Post) => void;
    onDeletePost: (post: Post) => void;
}

const PostItem = memo(({ post, currentUsername, onEditPost, onDeletePost }: PostItemProps) => {
    const handleEdit = useCallback(() => onEditPost(post), [post, onEditPost]);
    const handleDelete = useCallback(() => onDeletePost(post), [post, onDeletePost]);

    return (
        <article
            className="mb-6 border rounded-2xl"
            aria-labelledby={`post-title-${post.id}`}
        >
            <header className="bg-primary border-gray-500 text-white p-6 rounded-t-lg flex justify-between items-center">
                <h3 id={`post-title-${post.id}`} className="text-lg font-semibold">
                    {post.title}
                </h3>
                {post.username === currentUsername && (
                    <div className="flex space-x-5">
                        <button
                            onClick={handleDelete}
                            className="text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary transition-opacity cursor-pointer"
                            aria-label={`Delete post titled ${post.title}`}
                        >
                            <img src={DeleteIcon} alt="Edit ico" className="w-6 h-6 object-cover" />
                        </button>
                        <button
                            onClick={handleEdit}
                            className="text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary transition-opacity cursor-pointer"
                            aria-label={`Edit post titled ${post.title}`}
                        >
                            <img src={EditIcon} alt="Edit ico" className="w-6 h-6 object-cover" />
                        </button>
                    </div>
                )}
            </header>
            <div className="bg-white p-6 rounded-b-2xl">
                <div className="text-sm text-gray-500 mb-4 flex justify-between items-center w-full">
                    <span className="font-medium">@{post.username}</span>
                    <span className="font-medium">{formatTimeAgo(post.created_datetime)}</span>
                </div>
                <p className="text-gray-700">{post.content}</p>
            </div>
        </article>
    );
});

PostItem.displayName = "PostItem";

export default function PostList({
    posts,
    currentUsername,
    onEditPost,
    onDeletePost,
    isLoading = false,
}: PostListProps) {
    if (isLoading) {
        return (
            <div className="text-center text-gray-500 mt-6">
                Loading posts...
            </div>
        );
    }

    if (!posts?.length) {
        return (
            <div className="text-center text-gray-500 mt-6">
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
                />
            ))}
        </section>
    );
}

PostList.displayName = "PostList";