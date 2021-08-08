import React, { useEffect, useState } from 'react'
import { Container, Paper, TextField, Typography, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'

// Styles
import useStyles from './Styles'

// Actions
import { createPostAction } from '../../redux/posts/actions/CreatePostAction'
import { updatePostAction } from '../../redux/posts/actions/UpdatePostAction'

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles()

    const dispatch = useDispatch()
    const { posts } = useSelector((state) => state.posts)
    const currentPost = currentId ? posts.find((post) => post._id === currentId) : null

    const [formData, setFormData] = useState({ title: "", message: "", tags: "", selectedFile: "" })
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentId && posts.length > 0) {
            dispatch(updatePostAction(currentId, { ...formData, name: user?.result?.name }))
        } else {
            dispatch(createPostAction({ ...formData, name: user?.result?.name }))
        }

        clear()
    }

    const clear = () => {
        setFormData({ title: "", message: "", tags: "", selectedFile: "" })
        setCurrentId(null)
    }

    useEffect(() => {
        if (currentId && posts.length > 0) {
            setFormData(currentPost)
        }

    }, [currentPost, posts.length, currentId])

    // if no user sign in
    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" component="h6" color="inherit" align="center" noWrap={false}>
                    Please sign in to create your own memories and like others
                </Typography>
            </Paper>
        )
    }

    return (
        <Container maxWidth="lg">
            <Paper className={classes.paper} elevation={6}>
                <form className={`${classes.root} ${classes.form}`} noValidate="off" autoCorrect="on" autoCapitalize="off" onSubmit={handleSubmit}>
                    <Typography variant="h6" component="h6" color="inherit" align="center" noWrap={false} gutterBottom={true}>{currentId ? "Updating" : "Creating"} A Memory</Typography>
                    <TextField variant="outlined" color="primary" margin="normal" required={true} type="text" label="title" size="medium" fullWidth={true} name="title" value={formData.title} onChange={handleChange} />
                    <TextField variant="outlined" color="primary" margin="normal" required={true} type="text" label="message" size="medium" fullWidth={true} name="message" multiline={true} rows={3} value={formData.message} onChange={handleChange} />
                    <TextField variant="outlined" color="primary" margin="normal" required={true} type="text" label="tags" size="medium" fullWidth={true} name="tags" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",")})}/>
                    <div className={classes.fileInput}>
                        <FileBase 
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setFormData({ ...formData, selectedFile: base64})}
                        />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="medium" fullWidth={true} onClick={handleSubmit}>
                        {currentId ? "Update": "Create"} Memory
                    </Button>   
                    <Button variant="contained" color="secondary" size="medium" fullWidth={true} onClick={clear}>
                       Clear 
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default Form