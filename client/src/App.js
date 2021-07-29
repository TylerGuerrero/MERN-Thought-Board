import React from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// Components
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Auth from './components/auth/Auth'
import PostDetails from './components/postDetails/PostDetails'

export const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/posts"/>}/>
          <Route exact path="/auth" component={() => (user ? <Redirect to="/posts"/> : <Auth />)}></Route>
          <Route exact path="/posts" component={Home}/>
          <Route exact path="/posts/search" component={Home}/>
          <Route exact path="/posts/:id" component={PostDetails}/>
        </Switch>
      </Container>
    </Router>  
  )
}

export default App

