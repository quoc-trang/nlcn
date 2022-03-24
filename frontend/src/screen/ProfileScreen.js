import { TextField, Typography, Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
const ProfileScreen = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const history = useNavigate()

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
  console.log(orders)

  useEffect(() => {
    if (!userInfo) {
      return history('/login')
    } else {
      if (!userInfo.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(userInfo.name)
        setEmail(userInfo.email)
      }
    }
  }, [dispatch, userInfo, history, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }
  console.log(orders)
  return (
    <>
      <Grid container>
        <Grid item lg={6} md={6} xs={12} sm={6} align='center'>
          <FormContainer>
            {message && (
              <Typography sx={{ color: 'red' }}>{message}</Typography>
            )}
            {success && (
              <Typography sx={{ color: 'green' }}>
                Update Successfully
              </Typography>
            )}
            <Typography variant='h3'>User profile</Typography>
            <form
              onSubmit={submitHandler}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
              }}
            >
              <TextField
                sx={{ margin: 2 }}
                size='small'
                label='name'
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <TextField
                sx={{ margin: 2 }}
                size='small'
                label='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextField
                sx={{ margin: 2 }}
                size='small'
                label='Password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                sx={{ margin: 2 }}
                size='small'
                label='Confirm'
                type='password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button type='submit' variant='outlined'>
                Update
              </Button>
            </form>
          </FormContainer>
        </Grid>
        <Grid align='center' item lg={6} md={6} xs={12} sm={6}>
          <Typography variant='h3'>orders</Typography>
          <Grid container>
            {orders.map((order) => (
              <Grid item key={order._id}>
                lkajsldf
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ProfileScreen
