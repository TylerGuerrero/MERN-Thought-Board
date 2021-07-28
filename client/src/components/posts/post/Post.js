import React from 'react'
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Typography, Button} from '@material-ui/core'
import { ThumbUpAlt, Delete, MoreHoriz, ThumbUpAltOutlined } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import { likePostAction } from '../../../redux/posts/actions/LikePostAction'
import { deletePostAction } from '../../../redux/posts/actions/DeletePostAction'

import useStyles from './Styles'

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))

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
      };

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant="h6" component="h6" color="inherit" align="left" noWrap={false}> {post.name} </Typography>
                    <Typography variant="body2" component="body2" color="inherit" align="left" noWrap={false}> { moment(post.createdAt).fromNow() } </Typography>
                </div>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
                    <MoreHoriz fontSize="default" />
                    </Button>
                </div>
                )}
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
            <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePostAction(post._id))}>
                <Likes />
            </Button>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Button size="small" color="secondary" onClick={() => dispatch(deletePostAction(post._id))}>
                <Delete fontSize="small" /> Delete
            </Button>
            )}
            </CardActions>
        </Card>
    )
}

export default Post