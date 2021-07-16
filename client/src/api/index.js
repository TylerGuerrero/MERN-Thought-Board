import axios from 'axios'

axios.create({ baseURL: 'http://localhost:5000'})

export const fetchPost = async () => {
    return await axios.get("/api/posts")
}

export const createPost = async (post) => {
    return await axios.post("/api/posts", post)
}

export const updatePost = async (id, updatedPost) => {
    return await axios.put(`/api/posts/${id}`, updatedPost)
}