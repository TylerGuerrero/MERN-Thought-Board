import React, { useEffect, useState } from 'react'
import { Container, Paper, Typography, TextField, Button } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './Styles'

import { createPostAction } from '../../redux/posts/actions/CreatePostAction'
import { updatePostAction } from '../../redux/posts/actions/UpdatePostAction'

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    
    const { posts } = useSelector((state) => state.posts)
    const currentPost = currentId ? posts.find((post) => post._id === currentId) : null

    const [formData, setFormData] = useState({ title: "", message: "", tags: "", selectedFile: "" })
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if (currentId && posts.length > 0) {
            setFormData(currentPost)
        }
    }, [dispatch, currentId, currentPost, posts.length])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentId) {
            dispatch(updatePostAction(currentId, { ...formData, name: user?.result?.name }))
        } else {
            dispatch(createPostAction({...formData, name: user?.result?.name }))
        }

        clear()
    }

    const clear = () => {
        setCurrentId(null)
        setFormData({ title: "", message: "", tags: "", selectedFile: "" })
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to create your own memories and like others
                </Typography>
            </Paper>
        )
    }

    return (
        <Container maxWidth="lg">
            <Paper className={classes.paper} elevation={3}>
                <form className={`${classes.root} ${classes.form}`} noValidate="off" autoCorrect="on" autoCapitalize="off" onSubmit={handleSubmit}>
                    <Typography variant="h6" component="h6" color="inherit" align="center" noWrap={false} gutterBottom> { currentId ? "Updating" : "Create" } A Memory</Typography>
                    <TextField variant="outlined" color="primary" margin="normal" required fullWidth type="text" label="title" name="title" size="medium" value={formData.title} onChange={handleChange} />
                    <TextField variant="outlined" color="primary" margin="normal" required fullWidth type="text" label="message" name="message" size="medium" value={formData.message} onChange={handleChange} />
                    <TextField variant="outlined" color="primary" margin="normal" required fullWidth type="text" label="tags" name="tags" size="medium" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value.split(",")})}/>
                    <div className={classes.fileInput}>
                        <FileBase 
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setFormData({ ...formData, selectedFile: base64 })}
                        />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="medium" fullWidth onClick={handleSubmit}> {currentId ? 'Update' : 'Create'} A Memory </Button>
                    <Button variant="contained" color="secondary" size="medium" fullWidth onClick={clear}> Clear </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default Form