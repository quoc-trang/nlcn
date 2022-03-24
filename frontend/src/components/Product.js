import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
const Product = ({ product }) => {
  return (
    <Card elevation={3}>
      <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
        <CardMedia component='img' image={product.image} height='200' />
      </Link>
      <CardContent>
        <Typography>{product.name}</Typography>
        <Typography sx={{ color: 'brown' }}>{product.price} $</Typography>
      </CardContent>
    </Card>
  )
}

export default Product
