import React from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Components
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Auth from './components/auth/Auth'

export const App = () => {
  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/auth" component={Auth}></Route>
        </Switch>
      </Container>
    </Router>  
  )
}

export default App

