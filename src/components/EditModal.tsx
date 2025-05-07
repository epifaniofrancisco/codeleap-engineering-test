import React, { useState } from "react";
import type { Post } from "../types";

interface EditModalProps {
    post: Post | null;
    onClose: () => void;
    onSave: (updatedPost: Partial<Post>) => void;
}

const EditModal: React.FC<EditModalProps> = ({ post, onClose, onSave }) => {
    const [title, setTitle] = useState(post?.title || "");
    const [content, setContent] = useState(post?.content || "");

    if (!post) return null;

    const handleSave = () => {
        onSave({ title, content });
        onClose();
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-modal-title"
        >
            <div
                className="absolute inset-0 bg-[#777777CC] bg-opacity-80"
                onClick={onClose}
                aria-hidden="true"
            />

            <div className="relative bg-white rounded-lg p-6 max-w-xl w-full z-10 shadow-lg">
                <h2
                    id="edit-modal-title"
                    className="text-lg font-bold text-gray-900 mb-4"
                >
                    Edit Item
                </h2>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <div>
                        <label
                            htmlFor="edit-title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            id="edit-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="input"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="edit-content"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Content
                        </label>
                        <textarea
                            id="edit-content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="h-20 resize-none input"
                        />
                    </div>
                </form>

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        onClick={onClose}
                        className="button bg-white! border border-gray-400 text-gray-700! hover:bg-gray-50! font-medium focus:ring-gray-400!"
                        aria-label="Cancel editing"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="button bg-green-500! hover:bg-green-600! focus:ring-green-500!"
                        aria-label={`Save changes to post titled ${post.title}`}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
