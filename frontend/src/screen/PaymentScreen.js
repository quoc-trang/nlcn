import React, { useState } from 'react'
import {
  Typography,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const dispatch = useDispatch()
  const navigate = useNavigate()
  if (!shippingAddress) {
    navigate('/shipping')
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }
  return (
    <>
      <Container sx={{ marginTop: 5, marginBottom: 5 }}>
        <CheckoutSteps step1 step2 step3 />
      </Container>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box>
          <Typography align='center' variant='h3'>
            Payment Method
          </Typography>
          <form onSubmit={submitHandler}>
            <RadioGroup>
              <FormControlLabel
                value='paypal'
                control={<Radio />}
                label='PayPal'
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <FormControlLabel
                value='creditcard'
                control={<Radio />}
                label='Credit Card'
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </RadioGroup>
            <Button type='submit' variant='outlined'>
              Continue
            </Button>
          </form>
        </Box>
      </Container>
    </>
  )
}

export default PaymentScreen
