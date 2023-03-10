import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    LoginPage,
    SignupPage,
    FeedPage,
    PostPage
} from '../pages'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/post/:id" element={<PostPage />} />
            </Routes>
        </BrowserRouter>
    )
}