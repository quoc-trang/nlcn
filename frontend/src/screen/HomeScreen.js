import { Box, Container, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = () => {
  const params = useParams()
  const keyword = params.keyword
  const pageNumber = params.pageNumber
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])
  const productList = useSelector((state) => state.productList)
  const { error, products, page, pages } = productList
  return products ? (
    <Container>
      {!keyword && <ProductCarousel />}
      <Box>
        <Typography
          sx={(theme) => ({
            fontSize: '50px',
            [theme.breakpoints.down('sm')]: {
              fontSize: '20px',
            },
          })}
        >
          Latest product
        </Typography>
        {error ? (
          <Loader />
        ) : (
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid key={product._id} item lg={3} md={4} sm={6} xs={12}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Box
        sx={{
          width: '100%',
          marginTop: 10,
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 50,
        }}
      >
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
      </Box>
    </Container>
  ) : (
    <Loader />
  )
}

export default HomeScreen
