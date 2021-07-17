import React, { useState, useEffect } from 'react'
import { Container, Grid, Avatar, Paper, Typography, Button } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'

import Input from './Input'

import useStyles from './Styles'

const Auth = () => {
    const classes = useStyles()
    const [isSignUp, setIsSignUp] = useState()
    const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "" })

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <Container component="main" maxWidth="lg">
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
                   </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth