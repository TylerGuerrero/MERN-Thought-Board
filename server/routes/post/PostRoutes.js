import express from 'express'
import mongoose from 'mongoose'

const { Router } = express
const router = Router()

import { authCheck } from '../../middleware/auth/AuthMiddleware.js'

import Post from '../../models/post/PostModel.js'

router.get("/", async (req, res) => {
    const { page } = req.query

    try {
        const LIMIT = 8
        const startIndex = (Number(page) - 1) * LIMIT
        const total = await Post.countDocuments({})
        const posts = await Post.find({}).sort({ _id: -1 }).skip(startIndex).limit(LIMIT)
        return res.status(201).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil( total / LIMIT )})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

router.post("/", authCheck, async (req, res) => {
    const postBody = req.body

    try {
        const post = await Post.create({ ...postBody, creator: req.userId })
        return res.status(201).json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

router.put("/:id", authCheck, async (req, res) => {
    const { id: _id } = req.params
    const postBody = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(401).json({ error: "Id is not a mongoose Id" })

    try {
        const post = await Post.findByIdAndUpdate(_id, { ...postBody, _id }, { new: true })
        
        if (!post) return res.status(401).json({ error: "Post does not exist" })

        return res.status(201).json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

router.delete("/:id", authCheck, async (req, res) => {
    const { id: _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(401).json({ error: "Id is not a monoogse Id" })

    try {
        await Post.findByIdAndDelete(_id).exec()
        return res.status(201).json({ msg: "Post deleted" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})  

router.put("/:id", authCheck, async (req, res) => {
    const { id: _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(401).json({ error: "Id is not a monoogse Id" })
    
    try {
        const post = await Post.findById(_id).exec()

        if (!post) return res.status(401).json({ error: "Post does not exist" })
        
        const isLike = post.likes.include((like) => like === String(req.userId))

        if (isLike) {
            post.likes = post.likes.filter((like) => like !== String(req.userId))
        } else {
            post.likes.push(req.userId)
        }

        const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true })
        return res.status(201).json(updatedPost)
    } catch (error) {   
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

router.get("/search", async (req, res) => {
    const { searchQuery, tags } = req.query
   
    try {
        const title = new RegExp(searchQuery, 'i')
        const posts = await Post.find({ $or: [{ title }, { tags: { $in: tags.split(',') }}]})
        return res.status(201).json({ data: posts })
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: error.message})
    }
})

export default router