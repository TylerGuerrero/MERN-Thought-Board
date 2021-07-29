import React, { useState, useEffect, useCallback } from 'react'
import { AppBar, Toolbar, Button, Typography, Avatar } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'

import useStyles from './Styles'

import memories from '../../images/memories.png'

import { logoutAction } from '../../redux/auth/actions/AuthActions'

const Navbar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const logout = useCallback(() => {
        dispatch(logoutAction())
        history.push("/")    
        setUser(null)
    }, [dispatch, history])

    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }
        //jwt
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location, user?.token, logout])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography className={classes.heading} variant="h2" component="h2" color="inherit" align="center" noWrap={false}> Memories </Typography>
            <img className={classes.image} src={memories} height="60" alt="memories"/>
            <Toolbar className={classes.toolbar}>
            {
                user ? (
                    <div className={classes.profile}>
                        <Avatar src={user.result.imageUrl} variant="circular" alt={user.result.name}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography variant="h6" component="h6" color="inherit" align="center" noWrap={false} >{user.result.name}</Typography>
                        <Button className={classes.logout} variant="contained" href="/" color="secondary" size="small" onClick={logout}>Logout</Button>
                    </div>
                ): (
                    <Button variant="contained" href="/auth" size="small" color="primary">Sign In</Button>
                )
            }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar