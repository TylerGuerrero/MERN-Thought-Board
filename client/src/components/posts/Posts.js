import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useSelector } from 'react-redux'

import Post from './post/Post'

import useStyles from './Styles'

export const Posts = ({ setCurrentId }) => {
  const classes = useStyles()
  const { loading, posts, error} = useSelector((state) => state.posts)

  return (
    <React.Fragment>
      { loading && <CircularProgress /> }
      { (!loading && (posts.length > 0)) && (
        <Grid container alignContent="space-between" alignItems="center" spacing={3}>
          {posts.map((post) => {
            return (
              <Grid key={post._id} item xs={12} sm={6} lg={4}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            )
          })}
        </Grid>
      ) }
      { error && <p>error</p> }
    </React.Fragment>
  )
}

export default Posts