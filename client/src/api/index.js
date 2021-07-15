import axios from 'axios'

axios.create({ baseURL: 'http://localhost:5000'})

export const fetchPost = async () => {
    return await axios.get("/api/posts")
}

export const createPost = async (post) => {
    return await axios.post("/api/posts", post)
}