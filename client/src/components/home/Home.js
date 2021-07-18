import React, { useEffect, useState } from 'react'
import { Grid, Grow, Container} from '@material-ui/core'
import { useDispatch } from 'react-redux'

import Posts from '../posts/Posts'
import Form from '../form/Form'

import useStyles from './Styles'

import { fetchPosts } from '../../redux/posts/actions/FetchPostActions'

const Home = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState(null)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <Container maxWidth="lg">
      <Grow in>
        <Grid className={classes.mainContainer} container alignContent="space-bewteen" alignItems="stretch" spacing={10}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid> 
          <Grid item xs={12} sm={4}>
            <Form setCurrentId={setCurrentId} currentId={currentId} />
          </Grid>
        </Grid>
      </Grow>
    </Container>
  )
}

export default Home