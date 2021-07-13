import React, { useEffect } from 'react'
import { Container, AppBar, Toolbar, Grow, Grid, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import Posts from './components/posts/Posts'
import Form from './components/form/Form'

import memories from './images/memories.png'

import { fetchPosts } from './redux/posts/actions/FetchPostActions'

import useStyles from'./Styles'

function App() {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Toolbar>
          <Typography className={classes.heading} variant="h2" align="center"> Memories </Typography>
          <img src={memories} alt="memories" height="60"/>
        </Toolbar>
      </AppBar>
      <Grow in>
        <Container maxWidth="lg">
          <Grid container alignContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
