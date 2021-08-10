import React from 'react'
import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

const Input = ({ half, variant, color, margin, size, label, name, type, required, fullWidth, value, handleChange, handleShowPassword }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField 
                variant={variant}
                color={color}
                margin={margin}
                size={size}
                label={label}
                name={name}
                type={type}
                required={required}
                fullWidth={fullWidth}
                value={value}
                onChange={handleChange}
                InputProps={
                    name === "password" ? {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword}>
                                    { type === 'password' ? (<Visibility />) : (<VisibilityOff />)}
                                </IconButton>
                            </InputAdornment>
                        )
                    } : null
                }
            />
        </Grid>
    )
}

export default Input