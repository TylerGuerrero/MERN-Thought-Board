import React from 'react'
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Typography, Button} from '@material-ui/core'
import { ThumbUpAlt, Delete, MoreHoriz } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import { likePostAction } from '../../../redux/posts/actions/LikePostAction'
import { deletePostAction } from '../../../redux/posts/actions/DeletePostAction'

import useStyles from './Styles'

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant="h6" component="h6" color="inherit" align="left" noWrap={false}> {post.title} </Typography>
                    <Typography variant="body2" component="body2" color="inherit" align="left" noWrap={false}> { moment(post.createdAt).fromNow() } </Typography>
                </div>
                <div className={classes.overlay2}>
                    <Button>
                        <MoreHoriz fontSize="medium" onClick={() => setCurrentId(post._id)} />
                    </Button> 
                </div>
                <CardContent>
                    <Typography variant="h5" component="h5" color="inherit" align="left" noWrap={false}> {post.title} </Typography>
                    <div className={classes.details}>
                        <Typography variant="body2" component="p" color="inherit" align="left" noWrap={false}>
                            {
                                post.tags.map((tag) => {
                                    return (
                                        `#${tag} `
                                    )
                                })
                            }
                        </Typography>
                    </div>
                    <Typography variant="body2" component="p" color="inherit" align="left" noWrap={false}> {post.message} </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="contained" color="primary" size="small" startIcon={<ThumbUpAlt fontSize="small" />} onClick={() => dispatch(likePostAction(post._id))}>Like&nbsp;{post.likeCount}</Button>
                <Button variant="contained" color="secondary" size="small" startIcon={<Delete fontSize="small" />} onClick={() => dispatch(deletePostAction(post._id))}>Delete</Button>
            </CardActions>
        </Card>
    )
}

export default Post