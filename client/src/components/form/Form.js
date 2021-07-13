import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Paper, Typography, TextField, Button } from '@material-ui/core'
import FileBase from 'react-file-base64'

import useStyles from './Styles'
import { createPostAction } from '../../redux/posts/actions/CreatePostAction'

const Form = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ creator: "", title: "", message: "", tags: "", selectedFile: ""})
    
    const handleSubmit = () => {
        dispatch(createPostAction(formData))
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const clear = () => {
        
    }

    return (
       <Paper elevation={3} className={classes.paper}>
            <form autoComplete="off" noValidate="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6"> Create a Memory </Typography>
                <TextField variant="outlined" color="primary" margin="normal" label="creator" required type="string" name="creator" fullWidth value={formData.creator} onChange={handleChange} />
                <TextField variant="outlined" color="primary" margin="normal" label="title" name="title" required type="string" fullWidth value={formData.title} onChange={handleChange} />
                <TextField variant="outlined" color="primary" margin="normal" label="message" name="message" required type="string" fullWidth value={formData.message} onChange={handleChange} />
                <TextField variant="outlined" color="primary" margin="normal" label="tags" name="tags" required fullWidth type="string" value={formData.tags} onChange={handleChange} />
                <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setFormData({ ...formData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Add Memory</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Add Memory</Button>
            </form>
       </Paper>
    )
}

export default Form
