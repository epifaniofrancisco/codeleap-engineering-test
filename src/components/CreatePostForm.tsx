import { useState, useCallback } from "react";
import type { PostFormData } from "..";

interface CreatePostFormProps {
    username: string;
    onSubmit: (data: PostFormData) => void;
}

export default function CreatePostForm({ username, onSubmit }: CreatePostFormProps) {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const trimmedTitle = title.trim();
            const trimmedContent = content.trim();

            if (trimmedTitle && trimmedContent) {
                onSubmit({ username, title: trimmedTitle, content: trimmedContent });
                setTitle("");
                setContent("");
            }
        },
        [title, content, username, onSubmit]
    );

    const isCreateButtonDisabled = !title.trim() || !content.trim();

    return (
        <div className="bg-white m-6 p-6 rounded-2xl border border-gray-300">
            <h2 className="text-lg font-semibold mb-6">What's on your mind?</h2>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Hello world"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input"
                    />
                </div>
                <div>
                    <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        placeholder="Content here"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="h-20 resize-none input"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isCreateButtonDisabled}
                        className={`button ${!isCreateButtonDisabled
                            ? ""
                            : "bg-gray-300! cursor-not-allowed!"
                            }`}
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}
