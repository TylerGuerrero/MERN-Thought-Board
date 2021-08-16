import React, { useState } from 'react'
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Button, Typography } from '@material-ui/core'
import { ThumbUpAlt, ThumbUpAltOutlined, Delete, MoreHoriz } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import moment from 'moment'

// Actions
import { likePostAction } from '../../../redux/posts/actions/LikePostAction'
import { deletePostAction } from '../../../redux/posts/actions/DeletePostAction'

// Styles
import useStyles from './Styles'

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      }

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6" component="h6" align="left" noWrap={false}>
                        {post.title}
                    </Typography>
                    <Typography variant="body2" component="p" align="left" noWrap={false}>
                        { moment(post.createdAt).fromNow() }
                    </Typography>
                </div>
                {( user?.result?.googleId === post.creator || user?.result?._id === post.creator) && (
                    <Button variant="outlined" color="inherit" size="small" onClick={() => setCurrentId(post._id)}> 
                        <MoreHoriz fontSize="small" />
                    </Button>
                )}
                <CardContent>
                    <Typography variant="h5" component="h5" color="inherit" align="left" noWrap={false}>
                        { post.title }
                    </Typography>
                    <div className={classes.details}>
                        <Typography variant="body2" component="h6" color="inherit" noWrap={false}>
                            {
                                post.tags.map((tag) => {
                                    return (
                                        `#${tag}`
                                    )
                                })
                            }
                        </Typography>
                    </div>
                    <Typography variant="body2" component="h6" color="inherit" align="left" noWrap={false}>
                        { post.message }
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="contained" color="inherit" size="small" disabled={!user?.result} onClick={() => dispatch(likePostAction(post._id))}>
                    <Likes />
                </Button>
                {((user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button variant="contained" color="secondary" size="small" style={{ marginLeft: "40px" }} endIcon={<Delete fontSize="small" />} onClick={() => dispatch(deletePostAction(post._id))}>
                        Delete
                    </Button>
                ))}
            </CardActions>
        </Card>
    )
}

export default Post