import { Container, AppBar, Typography, Grow, Grid, Toolbar } from '@material-ui/core'

import Posts from './components/posts/Posts'
import Form from './components/form/Form'
import memories from './images/memories.png'

import useStyles from'./Styles'

function App() {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Toolbar>
          <Typography className={classes.heading} variant="h2" align="center"> Memories </Typography>
          <img className={classes.image} src={memories} alt="Memories" height="60"/>
        </Toolbar>  
      </AppBar>
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
  );
}

export default App;
