import React, { useState } from 'react'
import { TextField, Typography, Button, Box, Container } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }
  return (
    <Container>
      <Typography align='center' variant='h3'>
        Shipping
      </Typography>
      <Box sx={{ marginTop: 5, marginBottom: 5 }}>
        <CheckoutSteps step1 step2 />
      </Box>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '30vh',
        }}
        onSubmit={submitHandler}
      >
        <Box sx={{ margin: 1 }}>
          <TextField
            sx={{}}
            size='small'
            label='Address'
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </Box>
        <Box sx={{ margin: 1 }}>
          <TextField
            sx={{}}
            size='small'
            label='city'
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </Box>
        <Box sx={{ margin: 1 }}>
          <TextField
            sx={{}}
            size='small'
            label='postalCode'
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
          />
        </Box>
        <Box sx={{ margin: 1 }}>
          <TextField
            sx={{}}
            size='small'
            label='country'
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
        </Box>
        <Box sx={{ margin: 1 }}>
          <Button type='submit' variant='outlined'>
            Continue
          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default ShippingScreen
