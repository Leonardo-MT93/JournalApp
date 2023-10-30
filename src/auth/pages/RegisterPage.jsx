import {Link as RouterLink} from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from '../../hooks/useForm'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'
export const RegisterPage = () => {

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector( state => state.auth)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status])

  const formData = {
    email: '',
    password: '',
    displayName: ''
  }

  const formValidations = {
    email: [(value) => value.includes('@'), 'El email debe tener una @'],
    password: [(value) => value.length >= 6, 'El password debe tener una más de 6 letras'],
    displayName: [(value) => value.length  >=1, 'El nombre es obligatorio'],

  }
  

  const {onInputChange, email, password, displayName, formState,
     isFormValid, emailValid, displayNameValid, 
     passwordValid} = useForm(formData, formValidations)


  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true)
    if(!isFormValid) return

    dispatch(startCreatingUserWithEmailPassword(formState))
  }

  return (
    <AuthLayout title="Register">
      <h1>FormValid: {isFormValid ? 'Valid': 'Incorrect'}</h1>
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__Faster">
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2}}>
              <TextField label='Nombre Completo' type="text" placeholder="Leonardo Tolaba" fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={ !!displayNameValid && formSubmitted}
              helperText={displayNameValid}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2}}>
              <TextField label='Correo' type="email" placeholder="correo@gmail.com" fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={ !!emailValid && formSubmitted}
              helperText={emailValid}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2}}>
              <TextField label='Contraseña' type="password" placeholder="Contraseña" fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={ !!passwordValid && formSubmitted}
              helperText={passwordValid}
              />
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2, mt: 1}}>
            <Grid item xs={12} sm={6}
            display={ !!errorMessage ? '' : 'none'}>
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button type='submit' variant="outlined" fullWidth disabled={isCheckingAuthentication}>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr:1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
            Ingresar
            </Link>
          </Grid>
        </form>
    </AuthLayout>
  )
}
