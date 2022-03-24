import { Divider, Grid, Typography, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { createOrder } from '../actions/orderActions'
import { useNavigate } from 'react-router-dom'

const PlaceOrderScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100
  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2)

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success } = orderCreate
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
    }
  }, [navigate, success, order])
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4 />
      <Typography variant='h4'>Shipping</Typography>
      <Typography>
        Address: {cart.shippingAddress.address} {cart.shippingAddress.city}
        {cart.shippingAddress.postalCode}
        {cart.shippingAddress.country}
      </Typography>
      <Divider />
      <Typography variant='h4'>Payment method:</Typography>
      <Typography> {cart.paymentMethod}</Typography>
      <Divider />
      <Typography variant='h4'>Order items</Typography>
      <Grid sx={{ marginBottom: 20 }} container>
        <Grid item lg={9} md={9} sm={9}>
          <Grid container>
            {cart.cartItems.map((item, index) => (
              <Grid item lg={6} md={6} sm={6} key={index}>
                <Typography>name: {item.name}</Typography>
                <Typography>quanity: {item.qty}</Typography>
                <Typography>price: ${item.price}</Typography>
                <img src={item.image} alt={item.name} height='100px' />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item lg={3} md={3} sm={3}>
          <Typography variant='h4'>Order summary</Typography>
          <Divider />
          <Typography>items price: ${cart.itemsPrice}</Typography>
          <Divider />
          <Typography>shipping: ${cart.shippingPrice}</Typography>
          <Divider />
          <Typography>total price: ${cart.totalPrice}</Typography>

          <Button
            variant='outlined'
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place order
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  )
}

export default PlaceOrderScreen
