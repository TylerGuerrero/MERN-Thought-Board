import React from 'react'
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Typography, Button } from '@material-ui/core'
import { ThumbUpAlt, Delete, MoreHoriz } from '@material-ui/icons'
import moment from 'moment'

import useStyles from './Styles'

export const Post = ({ post, setCurrentId }) => {
    const classes = useStyles()

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia className={classes.media} title={post.title} image={post.selectedFile} />
                <div className={classes.overlay}>
                    <Typography variant="h6" component="h6" color="inherit" align="center"> {post.title} </Typography>
                    <Typography variant="body2" component="body2" color="inherit" align="left"> { moment(post.createdAt).fromNow() } </Typography>
                </div>
                <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} variant="outlined" color="inherit" size="small" onClick={() => setCurrentId(post._id)}> <MoreHoriz fontSize="default"/> </Button>
                </div>   
                <div className={classes.details}>
                    <Typography variant="body2" component="body2" color="inherit" size="small" align="left">
                        {post.tags.map((tag) =>{
                            return (
                                `#${tag} `
                            )
                        })}
                    </Typography>
                </div>
                <Typography className={classes.title} variant="h5" component="h5" color="textSecondary" align="left" gutterBottom>{ post.title }</Typography>
                <CardContent>
                    <Typography variant="body2" component="p" color="textSecondary" align="left">{ post.message }</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="contained" color="primary" size="small" startIcon={<ThumbUpAlt fontSize="default" />}>Like&nbsp;{ post.likeCount }</Button>
                <Button variant="contained" color="secondary" size="small" startIcon={<Delete fontSize="default" />}>Delete</Button>
            </CardActions>
        </Card>
    )
}

export default Post