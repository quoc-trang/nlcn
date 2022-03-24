import React, { useEffect } from 'react'
import {
  Typography,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
} from '@mui/material'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
const CartScreen = () => {
  const params = useParams()
  const productID = params.id
  const location = useLocation()
  const navigate = useNavigate()
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  let totalPrice = 0
  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty))
    }
  }, [dispatch, productID, qty])

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const handleCheckout = () => {
    navigate('/login?redirect=shipping')
  }
  return (
    <Container>
      <Typography variant='h1'>Shopping cart</Typography>
      <Link style={{ textDecoration: 'none' }} to={`/product/${productID}`}>
        <Button variant='outlined'>Go Back</Button>
      </Link>
      <Grid sx={{ marginTop: 2 }} spacing={5} container>
        {cartItems.map((item, index) => (
          <Grid
            key={index}
            sx={{ display: 'flex', alignItems: 'center' }}
            item
            lg={3}
            md={4}
            sm={6}
            ex={12}
          >
            <img src={item.image} alt='' height='70' />
            <Box sx={{ marginLeft: 1 }}>
              <Typography variant='body2'>{item.name}</Typography>
              <Typography variant='body2'>price: {item.price}</Typography>
              <Typography variant='body2'>quanity: {item.qty}</Typography>
            </Box>
            <IconButton
              onClick={() => removeFromCartHandler(item.product)}
              sx={{ color: 'red' }}
            >
              <DeleteOutlineIcon />
            </IconButton>
            <Typography sx={{ display: 'none' }}>
              {(totalPrice += item.qty * item.price)}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 3,
        }}
      >
        <Button onClick={handleCheckout} variant='outlined'>
          check out
        </Button>
        <Typography color='primary' sx={{ fontWeight: 'bold' }}>
          Total price: ${totalPrice.toFixed(2)}
        </Typography>
      </Box>
    </Container>
  )
}

export default CartScreen
