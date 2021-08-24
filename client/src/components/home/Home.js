import React, { useState, useEffect } from 'react'
import { Paper, Grid, Grow, TextField, Button, Container, AppBar, Toolbar } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ChipInput from 'material-ui-chip-input'

// Actions
import { fetchPosts } from '../../redux/posts/actions/FetchPostActions'
import { searchPostsAction } from '../../redux/posts/actions/SearchPostQueryAction'

// Components
import Paginate from '../Pagination'
import Posts from '../posts/Posts'
import Form from '../form/Form'

// Styles
import useStyles from './Styles'

function useQuery () {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const classes = useStyles()

  const history = useHistory()
  const location = useLocation()

  const dispatch = useDispatch()

  const query = useQuery()

  const page = query.get("page") || 1
  const searchQuery = query.get("searchQuery")

  const [currentId, setCurrentId] = useState(null)
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(searchPostsAction({ search, tags: tags.join(',')}))
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push("/")
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode() === 1) {
      searchPost()
    }
  }

  const handleAdd = (tag) => {
    setTags([...tags, tag])
  }

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete))
  }

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={classes.gridContainer} container alignContent="stretch" justifyContent="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <Toolbar>
                <TextField variant="outlined" color="primary" margin="normal" size="medium" required fullWidth type="text" name="search" label="Search" value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} />
              </Toolbar>
              <ChipInput variant="outlined" color="inherit" style={{ margin: "10px 0" }} label="Search Tags" onAdd={(chip) => handleAdd(chip)} onDelete={(chip) => handleDelete(chip)}/>
              <Button variant="outlined" color="inherit" size="medium" fullWidth onClick={searchPost}>Search</Button>
            </AppBar>
            <Form setCurrentId={setCurrentId} currentId={currentId} />
            <Paper elevation={6} className={classes.pagination}>
              {
                (!searchQuery && !tags.length) & (
                  <Paginate page={page} />
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