import { TextField, Typography, Button, Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useNavigate()
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      return history(redirect)
    }
  }, [redirect, userInfo, history])
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box>
          {message && <Typography sx={{ color: 'red' }}>{message}</Typography>}
          <Typography variant='h3'>Sign up</Typography>
          <form onSubmit={submitHandler}>
            <Box sx={{ margin: 3 }}>
              <TextField
                size='small'
                label='name'
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box sx={{ margin: 3 }}>
              <TextField
                size='small'
                label='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box sx={{ margin: 3 }}>
              <TextField
                size='small'
                label='Password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box sx={{ margin: 3 }}>
              <TextField
                size='small'
                label='Confirm'
                type='password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Box>
            <Box sx={{ margin: 3 }}>
              <Button type='submit' variant='outlined'>
                Register
              </Button>
            </Box>
          </form>
          <Typography>
            Have an account?
            <Link
              style={{ textDecoration: 'none' }}
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default RegisterScreen
