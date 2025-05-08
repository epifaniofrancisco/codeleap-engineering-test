import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import PostsPage from "./pages/PostsPage";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const username = localStorage.getItem("username");

    if (!username) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignupPage />} />
                <Route
                    path="/posts"
                    element={
                        <PrivateRoute>
                            <PostsPage />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}