export const goToLoginPage = (navigator) => {
    navigator('/');
}

export const goToSignupPage = (navigator) => {
    navigator('/signup');
}

export const goToFeedPage = (navigator) => {
    navigator('/feed');
}

export const goToPostPage = (navigator, id) => {
    navigator(`/post/${id}`); 
}
