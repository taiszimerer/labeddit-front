import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    LoginPage,
    SignupPage,
    FeedPage,
    PostPage, 
    NotFoundPage
} from '../pages'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}