import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    
    return req
})

export const fetchPost = async () => {
    return await API.get("/api/posts")
}

export const createPost = async (post) => {
    return await API.post("/api/posts", post)
}

export const updatePost = async (id, updatedPost) => {
    return await API.put(`/api/posts/${id}`, updatedPost)
}

export const deletePost = async (id) => {
    return await API.delete(`/api/posts/${id}`)
}

export const likePost = async (id) => {
    return await API.put(`/api/posts/${id}/likeCount`)
}

export const signIn = async (formData) => {
    return await API.post('/api/auth/login', formData)
}

export const signUp = async (formData) => {
    return await API.post('/api/auth/register', formData)
}

export const fetchPostsBySearch = async (searchQuery) => {
    return await API.get(`/api/posts/search/?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags }`)
}