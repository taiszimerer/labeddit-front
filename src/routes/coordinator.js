export const goToFeedPage = (navigator) => {
    navigator('/feed');
}

export const goToLoginPage = (navigator) => {
    navigator('/');
}

export const goToSignupPage = (navigator) => {
    navigator('/signup');
}

export const goToPostPage = (navigator) => {
    navigator(`/post/:id`);  //${id}
}
