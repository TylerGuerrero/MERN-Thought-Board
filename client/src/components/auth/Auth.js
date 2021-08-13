import React, { useState } from 'react'
import { Container, Paper, Avatar, Grid, Button } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'

// Components
import Input from './Input'
import Icon from './Icon'

// Actions 
import { signInAction } from '../../redux/auth/actions/AuthActions'
import { loginAction } from '../../redux/auth/actions/LoginActions'
import { registerAction } from '../../redux/auth/actions/RegisterActions'

// Styles
import useStyles from './Styles'

const Auth = () => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const history = useHistory()

    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" })
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

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

    const switchMode = () => {
        setIsSignUp((prevState) => !prevState)
    }

    const handleShowPassword = () => {
        setShowPassword((prevState) => !prevState)
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
        <Container maxWidth="xs" component="main">
            <Paper className={classes.paper} elevation={6}>
                <Avatar className={classes.avatar} variant="circular">
                    <LockOutlined />
                </Avatar>
                <form className={classes.form} onSubmit={handleSubmit} noValidate="off" autoCapitalize="off" autoCorrect="off">
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <React.Fragment>
                                    <Input half={true} variant="outlined" color="primary" margin="normal" size="medium" label="First Name" required={true} fullWidth={true} name="firstName" type="text" value={formData.firstName} handleChange={handleChange} />
                                    <Input half={true} variant="outlined" color="primary" margin="normal" size="medium" label="Last Name" required={true} fullWidth={true} name="lastName" type="text" value={formData.lastName} handleChange={handleChange} />
                                </React.Fragment>
                            )
                        }
                        <Input half={false} variant="outlined" color="primary" margin="normal" size="medium" label="Email" required={true} fullWidth={true} name="email" type="email" value={formData.email} handleChange={handleChange} />
                        <Input half={false} variant="outlined" color="primary" margin="normal" size="medium" label="Password" required={true} fullWidth={true} name="password" type={showPassword ? "password": "text"} value={formData.password} handleChange={handleChange} handleShowPassword={handleShowPassword} />
                        {
                            isSignUp && (
                                <Input half={false} variant="outlined" color="primary" margin="normal" size="medium" label="Confirm Password" required={true} fullWidth={true} name="confirmPassword" type="password" value={formData.confirmPassword} handleChange={handleChange} />
                            )
                        }
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" size="medium" fullWidth={true} onClick={handleSubmit}>
                                { isSignUp ? "Sign Up" : "Login"}
                            </Button>
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
                                <Button variant="contained" color="primary" size="medium" fullWidth={true} onClick={switchMode}>
                                    { isSignUp ? "Already have a account ? Login here" : "Dont have a Account ? Register here"}
                                </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth