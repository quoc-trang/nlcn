import { Divider, Grid, Typography, Button, Container } from '@mui/material'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from '../actions/orderActions'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVERED_RESET,
} from '../constants/orderConstants'
const OrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const orderId = params.id
  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDelivered = useSelector((state) => state.orderDelivered)
  const { loading: loadingDelivered, success: successDelivered } =
    orderDelivered

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    )
  }
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if (!order || successPay || successDelivered) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVERED_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [orderId, dispatch, successPay, order, successDelivered, navigate])
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <FormContainer>
        <Typography align='center' variant='h2'>
          Shipping
        </Typography>
        <Typography>
          <strong>name:</strong> {order.user.name}
        </Typography>
        <Typography>
          <strong>email:</strong> {order.user.email}
        </Typography>
        <Typography>
          <strong>Address:</strong> {order.shippingAddress.address}{' '}
          {order.shippingAddress.city}
          {order.shippingAddress.postalCode}
          {order.shippingAddress.country}
        </Typography>
        {order.isDelivered ? (
          <Typography
            sx={{
              color: 'white',
              background: 'lightgreen',
              width: '50%',
              margin: 1,
              padding: 1,
            }}
          >
            Delivered on {order.deliveredAt}
          </Typography>
        ) : (
          <Typography
            sx={{
              color: 'white',
              background: 'lightcoral',
              width: '50%',
              margin: 1,
              padding: 1,
            }}
          >
            Not Delivered
          </Typography>
        )}
        <Divider />
        <Typography variant='h4'>Payment method:</Typography>
        <Typography> {order.paymentMethod}</Typography>
        {order.isPaid ? (
          <Typography
            sx={{
              color: 'white',
              background: 'lightgreen',
              width: '50%',
              margin: 1,
              padding: 1,
            }}
          >
            Paid on {order.paidAt}
          </Typography>
        ) : (
          <Typography
            sx={{
              color: 'white',
              background: 'lightcoral',
              width: '50%',
              margin: 1,
              padding: 1,
            }}
          >
            Not paid
          </Typography>
        )}
        <Divider />
        <Typography variant='h4'>Order items</Typography>
        <Grid container>
          <Grid item lg={9} md={9} sm={9}>
            <Grid container>
              {order.orderItems.map((item, index) => (
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
            <Typography>items price: ${order.itemsPrice}</Typography>
            <Divider />
            <Typography>shipping: ${order.shippingPrice}</Typography>
            <Divider />
            <Typography>total price: ${order.totalPrice}</Typography>
            {!order.isPaid && (
              <Typography>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </Typography>
            )}
            {loadingDelivered && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <Button variant='outlined' onClick={deliverHandler}>
                  Mark as delivered
                </Button>
              )}
          </Grid>
        </Grid>
      </FormContainer>
    </Container>
  )
}

export default OrderScreen
