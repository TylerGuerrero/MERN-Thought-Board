import React, { useEffect, useState } from 'react'
import { Container, Grid, Grow } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import useStyles from './Styles'

import Posts from '../posts/Posts'
import Form from '../form/Form'

import { fetchPosts } from '../../redux/posts/actions/FetchPostActions'

const Home = () => {
    const classes = useStyles()
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    return (
        <Container maxWidth="lg">
          <Grow in>
            <Grid className={classes.mainContainer} container alignContent="space-between" alignItems="stretch" spacing={10}>
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId } />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Grow>
        </Container>
    )
}

export default Home