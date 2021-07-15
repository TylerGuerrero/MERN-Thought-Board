import React, { useEffect } from 'react'
import { Container, AppBar, Toolbar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'

// Components
import Form from './components/form/Form'
import Posts from './components/posts/Posts'

// Actions
import { fetchPosts } from './redux/posts/actions/FetchPostActions'

// Styles
import useStyles from './Styles'

// Pic
import memories from './images/memories.png'

export const App = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Toolbar>
          <Typography className={classes.heading} variant="h2" component="h2" color="inherit" align="center" noWrap={false}> Memories </Typography>
          <img src={memories} alt="memories" height="60 "/>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Grow in>
          <Grid container alignContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Grow>
      </Container>
    </Container>  
  )
}

export default App

