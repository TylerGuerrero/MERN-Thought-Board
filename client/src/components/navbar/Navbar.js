import React, { useState, useEffect, useCallback } from 'react'
import { AppBar, Toolbar, Button, Typography, Avatar } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

// Actions
import { logoutAction } from '../../redux/auth/actions/AuthActions'

// Images
import memoriesLogo from '../../images/memoriesLogo.png'
import memoriesText from '../../images/memoriesText.png'

// Styles
import useStyles from './Styles'

const Navbar = () => {
    const classes = useStyles()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const history = useHistory()
    const location = useLocation()

    const dispatch = useDispatch()

    const logout = useCallback(() => {
        dispatch(logoutAction)
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

    }, [logout, user?.token, location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <img className={classes.image} src={memoriesLogo} alt="Memories Logo" title="Memories Logo" height="45px" />
                <img className={classes.image} src={memoriesText} alt="Memories Text" title="Memories Text" height="40px" />
            </div>
            <Toolbar className={classes.toolbar}>
                { user ? (
                    <div className={classes.profile}>
                        <Avatar src={user.result.imageUrl} variant="circular" alt={user.result.name}>
                            { user.result.name.charAt(0) }
                        </Avatar>
                        <Typography variant="h6" component="h6" color="inherit" align="center" noWrap={true}>
                            { user.result.name }
                        </Typography>
                        <Button className={classes.logout} variant="contained" color="primary" size="small" href="/" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button variant="contained" color="primary" size="small" href="/auth" >
                        Sign in
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar