import React, { useState } from 'react'
import { Container, Grid, Avatar, Paper, Typography, Button } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Input from './Input'
import Icon from './Icon'

import useStyles from './Styles'

import { signInAction } from '../../redux/auth/actions/AuthActions'

const Auth = () => {
    const classes = useStyles()
    
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: ""})
    const [showPassword, setShowPassword] = useState(true)
    
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isSignUp) {

        } else {
            
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const switchMode = () => {
        setIsSignUp((isSignUp) => !isSignUp)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch(signInAction({ result, token }))
            history.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log('Google Sign in was unsuccessfeul. Try again')
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <form className={classes.form} autoComplete="off" autoCapitalize="off" onSubmit={handleSubmit}>
                   <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <React.Fragment>
                                    <Input half={true} name="firstName" type="text" variant="outlined" color="primary" margin="normal" fullWidth={false} size="medium" autoFocus={true} value={formData.first_name} handleChange={handleChange} label="Fist Name" />
                                    <Input half={true} name="lastName" type="text" variant="outlined" color="primary" margin="normal" fullWidth={false} size="medium" autoFocus={true} label="Last Name" value={formData.last_name} handleChange={handleChange} />
                                </React.Fragment>
                            )
                        }
                        <Input half={false} variant="outlined" color="primary" type="email" name="email" fullWidth={true} margin="normal" label="Email" size="medium" autoFocus={false} value={formData.email} handleChange={handleChange} />
                        <Input variant="outlined" name="password" label="Password" handleChange={handleChange} fullWidth type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignUp && 
                            <Input variant="outlined" fullWidth name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>
                        }
                   </Grid>
                   <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                   <GoogleLogin 
                    clientId="463367151093-qjbvhan0af7rb5vdmp7bl0cka1om51q0.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button
                            className={classes.googleButton}
                            color="primary"
                            fullWidth
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon={ <Icon /> }
                            variant="contained"
                        >
                            Google-Sign-IN
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                   />
                    <Grid container alignContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth