import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

const Input = ({ half, name, type, variant, color, handleChange, value, margin, fullWidth, label, size, autoFocus, handleShowPassword }) => {
    return (
        <Grid item xs={6} sm={half ? 6 : 12}>
            <TextField 
                name={name}
                type={type}
                variant={variant}
                color={color}
                margin={margin}
                required
                fullWidth={fullWidth}
                onChange={handleChange}
                value={value}
                label={label}
                size={size}
                autoFocus={autoFocus}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end"> 
                            <IconButton onClick={handleShowPassword}> {type === 'password' ? <Visibility /> : <VisibilityOff />}</IconButton>
                        </InputAdornment>
                    )
                } : null}
            />
        </Grid>
    )
}

export default Input
