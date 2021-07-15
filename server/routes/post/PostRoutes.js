import express from 'express'

import Post from '../../models/post/PostModel.js'

const { Router } = express
const router = Router()

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find({})
        return res.status(201).json(posts)
    } catch (error) {
        return res.status(400).json({ message: error.message})
    }   
})

router.post("/", async (req, res) => {
    const { title, message, creator, selectedFile } = req.body

    try {   
        const post = await Post.create({ title, message, creator, selectedFile })
        return res.status(201).json(post)
    } catch (error) {
        return res.status(400).json({ error: erorr.message })
    }   
})

export default router