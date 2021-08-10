import React, { useState, useEffect } from 'react'
import { Container, Paper, TextField, Typography, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'

// Actions
import { createPostAction } from '../../redux/posts/actions/CreatePostAction'
import { updatePostAction } from '../../redux/posts/actions/UpdatePostAction'

// Styles
import useStyles from './Styles'

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles()

    const dispatch = useDispatch()
    const { posts } = useSelector((state) => state.posts)
    const currentPost = currentId ? posts.find((post) => post._id === currentId) : null

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
    const [formData, setFormData] = useState({ title: "", message: "", tags: "", selectedFile: "" })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const clear = () => {
        setFormData({ title: "", message: "", tags: "", selectedFile: "" })
        setCurrentId(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentId) {
            dispatch(updatePostAction(currentId, { ...formData, name: user?.result?.name }))
        } else {
            dispatch(createPostAction({ ...formData, name: user?.result?.name }))
        }

        clear()
    }

    useEffect(() => {
        if (currentId && posts.length > 0) {
            setFormData(currentPost)
        }

    }, [currentId, currentPost, posts.length])

    // if user is not signed in
    if (!user?.result?.name) {
        return (
            <Container maxWidth="lg">
                <Paper className={classes.paper} elevation={6}>
                    <Typography variant="h6" component="h6" color="inherit" align="center" noWrap={false}>
                        Please sign in to create your own memories and like others
                    </Typography>
                </Paper>
            </Container>
        )
    }

    return (
        <Container maxWidth="lg">
            <Paper className={classes.paper} elevation={6}>
                <form className={`${classes.root} ${classes.form}`} noValidate="on" autoCapitalize="off" autoComplete="off" onSubmit={handleSubmit}>
                    <Typography variant="h6" component="h6" color="inherit" align="center" noWrap={false}>
                        { currentId ? "Updating" : "Creating"} A Memory
                    </Typography>
                    <TextField variant="outlined" color="inherit" margin="normal" type="text" label="title" required={true} fullWidth={true} name="title" size="medium" value={formData.title} onChange={handleChange} />
                    <TextField variant="outlined" color="inherit" margin="normal" type="text" label="message" required={true} fullWidth={true} name="message" size="medium" multiline={true} rows={3} value={formData.message} onChange={handleChange} />
                    <TextField variant="outlined" color="inherit" margin="normal" type="text" label="tags" required={true} fullWidth={true} name="tags" size="medium" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",")})} />
                    <div className={classes.fileInput}>
                        <FileBase 
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setFormData({ ...formData, selectedFile: base64 })}
                        />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" color="contained" size="medium" fullWidth={true} onClick={handleSubmit}>
                        { currentId ? "Updating" : "Creating"} A Memory
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