import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    const [username, setUsername] = useState<string>(localStorage.getItem("username") || "");
    const navigate = useNavigate();

    const trimmedUsername = username.trim();
    const isValid = trimmedUsername.length >= 3;
    const showError = trimmedUsername.length < 3 && username.length > 0;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isValid) {
            localStorage.setItem("username", trimmedUsername);
            navigate("/posts");
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6">
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
                <h1 className="text-xl font-bold">Welcome to CodeLeap network!</h1>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <label htmlFor="username-input" className="block text-sm font-medium text-gray-700">
                            Please enter your username
                        </label>
                        <input
                            id="username-input"
                            type="text"
                            placeholder="John Doe"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                            className={`input ${showError
                                ? "border-red-500! focus:ring-red-500! focus:border-red-500!"
                                : ""
                                }`}
                        />
                        {showError && (
                            <p id="username-error" className="text-red-500 text-sm mt-1" role="alert">
                                Username must be at least 3 characters
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`button ${isValid
                                ? ""
                                : "bg-gray-300! cursor-not-allowed!"
                                }`}
                        >
                            ENTER
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}