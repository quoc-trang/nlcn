import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CardMedia,
  Grid,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Loader from '../components/Loader'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Review from '../components/Review'
const ProductScreen = () => {
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { error: errorProductReview, success: successProductReview } =
    productReviewCreate

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [anchor, setAnchor] = React.useState(null)
  const openDashboard = Boolean(anchor)

  const handleChange = (e) => {
    setQty(e.target.value)
  }
  const params = useParams()
  useEffect(() => {
    if (successProductReview) {
      alert('Review submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(params.id))
  }, [dispatch, params.id, successProductReview])
  const addToCartHandler = () => {
    navigate(`/cart/${product._id}?qty=${qty}`)
  }

  const handleClickDashboard = (event) => {
    setAnchor(event.currentTarget)
  }

  const handleCloseDashboard = () => {
    setAnchor(null)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    )
  }
  return (
    <Container>
      <Link style={{ textDecoration: 'none' }} to='/'>
        <Button variant='outlined'>Go back</Button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Typography sx={{ color: 'lightcoral' }} variant='h1'>
          {error}
        </Typography>
      ) : (
        <>
          <Box style={{ display: 'flex', marginTop: '5vh' }}>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CardMedia
                  image={product.image}
                  height='400'
                  component='img'
                  alt=''
                  sx={(theme) => ({
                    [theme.breakpoints.down('sm')]: {
                      height: '150px',
                    },
                  })}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {product.name}
                  </Typography>
                  <Typography>price: ${product.price}</Typography>
                  <Typography>
                    state:{' '}
                    {product.countInStock > 0 ? 'in stock' : 'out of stock'}
                  </Typography>
                  {product.countInStock ? (
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                          Quanity
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          value={qty}
                          label='Quanity'
                          onChange={handleChange}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  ) : (
                    ''
                  )}
                  <Typography sx={{ textTransform: 'none' }}>
                    description: {product.description}
                  </Typography>

                  <Button
                    onClick={addToCartHandler}
                    sx={{ textTransform: 'none', marginTop: 2 }}
                    variant='outlined'
                  >
                    Add to cart
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Container>
  )
}

export default ProductScreen
