import React from 'react'
import { Card, CardActionArea, CardActions, CardMedia, CardContent, Button, Typography } from '@material-ui/core'
import { ThumbUpAlt, Delete, MoreHoriz } from '@material-ui/icons'
import moment from 'moment'
import { useDispatch } from 'react-redux'

import useStyles from './Styles'
import { deletePostAction } from '../../../redux/posts/actions/DeletePostAction'
import { likePostAction } from '../../../redux/posts/actions/LikePostAction'

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch() 
    
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6" component="h6" color="inherit" align="left"> {post.title} </Typography>
                    <Typography variant="body2" component="p" color="inherit" align="left"> { moment(post.createdAt).fromNow() } </Typography>
                </div>
                <div className={classes.overlay2}>
                    <Button variant="outlined" color="inherit" size="small" >
                        <MoreHoriz onClick={() => setCurrentId(post._id)} fontSize="medium"/>
                    </Button>
                </div>
                <div className={classes.details}>
                    <Typography variant="body2" component="p" color="inherit" align="left">{
                        post.tags.map((tag) => {
                            return (
                                `#${tag} `
                            )
                        })
                    }</Typography>
                </div>
                <Typography className={classes.title} variant="h5" component="h5" color="inherit" align="left" gutterBottom> {post.title} </Typography>
                <CardContent>
                    <Typography variant="body2" component="p" color="inherit" align="left"> {post.message} </Typography>
                </CardContent>
            </CardActionArea>           
            <CardActions>
                <Button variant="outlined" color="primary" size="small" startIcon={<ThumbUpAlt fontSize="medium"/>} onClick={() => dispatch(likePostAction(post._id))}>Likes&nbsp;{ post.likeCount } </Button>
                <Button variant="outlined" color="secondary" size="small" startIcon={<Delete fontSize="medium"/>} onClick={() => dispatch(deletePostAction(post._id))}>Delete</Button>
            </CardActions> 
        </Card>
    )
}

export default Post