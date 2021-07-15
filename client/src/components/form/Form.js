import React, { useState } from 'react'
import { Paper, Typography, TextField, Button } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'

import { createPostAction } from '../../redux/posts/actions/CreatePostAction'

import useStyles from './Styles'

export const Form = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({ creator: "", title: "", message: "", tags: "", selectedFile: "" })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPostAction(formData))
    }

    const clear = () => {

    }

    return (
        <Paper className={classes.paper} elevation={3} variant="elevation">
            <form className={`${classes.root} ${classes.form}`} noValidate="off" autoCapitalize="off" onSubmit={handleSubmit}>
                <Typography variant="h6" component="h6" color="inherit" align="center" noWrap={false}> Add A Memory </Typography>
                <TextField variant="outlined" color="primary" margin="normal" size="medium" type="text" fullWidth required label="creator" name="creator" value={formData.creator}  onChange={handleChange} />
                <TextField variant="outlined" color="primary" margin="normal" size="medium" type="text" fullWidth required label="title" name="title" value={formData.title} onChange={handleChange} />
                <TextField variant="outlined" color="primary" margin="normal" size="medium" type="text" fullWidth required label="message" name="message" value={formData.message} onChange={handleChange} />
                <TextField variant="outlined" color="primary" margin="normal" size="medium" type="text" fullWidth required label="tags" name="tags" value={formData.tags} onChange={handleChange} />
                <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setFormData({ ...formData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="outlined" color="primary" size="medium" fullWidth type="submit"> Create Memory </Button>
                <Button variant="outlined" color="secondary" size="medium" fullWidth onClick={clear}> Clear </Button>
            </form>
        </Paper>
    )
}

export default Form