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
import { searchPostsAction } from '../../redux/posts/actions/SearchPostQueryAction'

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
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost()
    }
  }

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(searchPostsAction({ search, tags: tags.join(',')}))
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push("/")
    }
  }

  const handleAdd = (tag) => setTags([...tags, tag])

  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

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
                  onKeyPress={handleKeyPress}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Toolbar>
              <ChipInput 
                  style={{margin: '10px 0'}}
                  value={tags}
                  onAdd={(chip) => handleAdd(chip)}
                  onDelete={(chip) => handleDelete(chip)}
                  label="Search Tags"
                  variant="outlined"
                />
                <Button variant="contained" color="primary" onClick={searchPost} className={classes.searchButton}>Search</Button>
            </AppBar>
            <Form setCurrentId={setCurrentId} currentId={currentId} />
            <Paper elevation={6} className={classes.pagination}>
              {
                (!searchQuery && !tags.length) && (
                  <Paginate page={page} className={classes.pagination}/>
                )
              }
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home