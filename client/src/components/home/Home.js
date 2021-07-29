import React, { useEffect, useState } from 'react'
import { Grid, Grow, Container, Paper, AppBar, Toolbar, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'

import Paginate from '../Pagination'
import Posts from '../posts/Posts'
import Form from '../form/Form'

import useStyles from './Styles'

import { fetchPosts } from '../../redux/posts/actions/FetchPostActions'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const classes = useStyles()
  
  const dispatch = useDispatch()
  
  const history = useHistory()
  const location = useLocation()
  const query = useQuery()

  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')

  const [currentId, setCurrentId] = useState(null)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={classes.gridContainer} container alignContent="space-bewteen" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid> 

          <Grid item xs={12} sm={6} md={3}>
            <AppBar 
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <Toolbar>
                <TextField 
                  name="search"
                  variant="outlined"
                  label="Search Memories"
                  fullWidth
                  value="TEST"
                  onChange={() => {}}
                />
              </Toolbar>
            </AppBar>
            <Form setCurrentId={setCurrentId} currentId={currentId} />
            <Paper elevation={6} className={classes.pagination}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home