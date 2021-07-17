import React from 'react'
import { AppBar, Toolbar, Typography, Avatar, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import useStyles from './Styles'
import memories from '../../images/memories.png'

const Navbar = () => {
    const classes = useStyles()
    const user = null

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography className={classes.heading} variant="h2" component="h2" color="inherit"> Memories </Typography>
            <img className={classes.image} src={memories} height="60" alt="memories" / >
            <Toolbar className={classes.toolbar}>
                { user ? (
                    <div className={classes.profile}>
                        <Avatar alt={user.result.name} src={user.result.imageUrl} variant="circular"> { user.result.name.charAt(0) } </Avatar>
                        <Typography variant="h6" component="h6" color="inherit" align="center">{ user.result.name }</Typography>
                        <Button className={classes.logout} variant="contained" color="secondary" size="small">Logout</Button>
                    </div>
                ) : (
                    <Button variant="contained" color="primary" size="small" component={Link} to="/auth">Sign-In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar