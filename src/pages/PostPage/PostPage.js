import { useParams } from "react-router-dom"

export const PostPage = () => {
    const params = useParams()

    return (
        <div>
            <h1>Post</h1>
            {params.id}
        </div>
    )
}