import React, { useState } from 'react'
import { Container, Paper, Grid, Button, Avatar } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { GoogleLogin } from 'react-google-login'
import { useHistory } from 'react-router-dom'

import useStyles from './Styles'

import Input from './Input'
import Icon from './Icon'

import { signInAction } from '../../redux/auth/actions/AuthActions.js'
import { loginAction } from '../../redux/auth/actions/LoginActions'
import { registerAction } from '../../redux/auth/actions/RegisterActions'

const Auth = () => {
    const classes = useStyles()

    const [isSignUp, setIsSignUp] = useState(false) 
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" })
    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isSignUp) {
            dispatch(registerAction(formData, history))
        } else {
            dispatch(loginAction(formData, history))
        }
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

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const switchMode = () => {
        setIsSignUp((prevState) => !prevState)
        setShowPassword(false)
    }

    return (
        <Container maxWidth="xs" component="main">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <form className={classes.form} autoCapitalize="off" autoCorrect="off" noValidate="off" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignUp && (
                            <React.Fragment>
                                <Input half={true} variant="outlined" color="primary" margin="normal" size="medium" name="firstName" label="First Name" type="text" required={true} fullWidth={true} value={formData.firstName} handleChange={handleChange} />
                                <Input half={true} variant="outlined" color="primary" margin="normal" size="medium" name="lastName" label="Last Name" type="text" required={true} fullWidth={true} value={formData.lastName} handleChange={handleChange} />
                            </React.Fragment>
                        )}
                        <Input half={false} variant="outlined" color="primary" margin="normal" size="medium" name="email" label="Email" type="email" required={true} fullWidth={true} value={formData.email} handleChange={handleChange} />
                        <Input half={false} variant="outlined" color="primary" margin="normal" size="medium" name="password" label="Password" type={showPassword ? "password": "text"} required={true} fullWidth={true} value={formData.password} handleChange={handleChange} handleShowPassword={handleShowPassword}/>
                        { isSignUp && (
                            <Input half={false} variant="outlined" type="password" color="primary" margin="normal" size="medium" name="confirmPassword" label="Confirm Password" required={true} fullWidth={true} value={formData.confirmPassword} handleChange={handleChange} />
                        )}
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" size="medium" fullWidth={true}>{isSignUp ? 'Sign Up': 'Login'}</Button>
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="outlined" color="inherit" size="large" fullWidth={true} onClick={switchMode}>{isSignUp ? "Already have an account ? Sign In": "Dont have an account ? Sign Up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth