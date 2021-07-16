import express from 'express'
import mongoose from 'mongoose'

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

router.put("/:id", async (req, res) => {
    const { id: _id } = req.params
    const post = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(401).json({ message: "Id not authorized" })

    try {
        const updatedPost = await Post.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
        
        if (!updatedPost) return res.status(401).json({ message: "Post not found"})

        return res.status(201).json(updatedPost)
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
})

export default router