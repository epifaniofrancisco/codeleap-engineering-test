import type { Post } from "../types";
import React from "react";

interface DeleteModalProps {
    post: Post | null;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ post, onClose, onDelete }) => {
    if (!post) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
        >
            <div
                className="absolute inset-0 bg-[#777777CC] bg-opacity-80"
                onClick={onClose}
                aria-hidden="true"
            />

            <div className="relative bg-white rounded-2xl p-6 max-w-xl w-full z-10 shadow-lg">
                <p className="text-gray-900 mb-6 font-bold">
                    Are you sure you want to delete this item?
                </p>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="button bg-white! border border-gray-400 text-gray-700! hover:bg-gray-50! font-medium focus:ring-gray-400!"
                        aria-label="Cancel deletion"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="button text-white bg-red-400! hover:bg-red-500!  focus:ring-red-500!"
                        aria-label={`Confirm deletion of post titled ${post.title}`}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
