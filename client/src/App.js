import React from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// Components
import Navbar from './components/navbar/Navbar'
import Auth from './components/auth/Auth'
import Home from './components/home/Home'
import PostDetails from './components/postDetails/PostDetails'

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"))

  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route exact path="/" component={() => (<Redirect to="/posts"/>)}/>
          <Route exact path="/auth" component={() => (user ? <Redirect to="/posts"/> : <Auth />)}/>
          <Route exact path="/posts" component={Home}/>
          <Route exact path="/posts/search" component={Home}/>
          <Route exact path="/posts/:id" component={PostDetails}/>
        </Switch>
      </Container>
    </Router>
  )
}

export default App