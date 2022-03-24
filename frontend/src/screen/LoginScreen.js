import { TextField, Typography, Button, Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Loader from '../components/Loader'
const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useNavigate()
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      return history(redirect)
    }
  }, [redirect, userInfo, history])
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ margin: 3 }}>
          {error ? (
            <Typography align='center' sx={{ color: 'red' }}>
              invalid password or email
            </Typography>
          ) : (
            ''
          )}
          {loading ? <Loader /> : ''}
          <Typography align='center' variant='h3'>
            Sign in
          </Typography>
          <form onSubmit={submitHandler}>
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
              <Button type='submit' variant='outlined'>
                Sign in
              </Button>
            </Box>
          </form>
          <Typography>
            New customer?
            <Link
              style={{ textDecoration: 'none' }}
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default LoginScreen
