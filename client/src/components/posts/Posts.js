import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'

// Components
import Post from './post/Post'

const Posts = ({ setCurrentId }) => {
  const { loading, posts, error } = useSelector((state) => state.posts)

  return (
    <React.Fragment>
      { loading && <CircularProgress />}
      {(!loading && (posts.length > 0) && (
        <Grid container alignContent="space-between" alignItems="stretch" spacing={3}>
          { posts.map((post) => {
            return (
              <Grid key={post._id} item xs={12} md={6} lg={4}>
                <Post post={post} setCurrentId={setCurrentId} />  
              </Grid>

            )
          })}
        </Grid>
      ))}
      { error && (<p> { error } </p>)}
    </React.Fragment>
  )
}

export default Posts