import axios from 'axios'
import { TextField, Typography, Button, Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
const ProductEditScreen = () => {
  const params = useParams()
  const productId = params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  const history = useNavigate()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setBrand(product.brand)
        setDescription(product.description)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setImage(product.image)
      }
    }
  }, [dispatch, product, productId, history, successUpdate])
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        description,
        countInStock,
        image,
        category,
      })
    )
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      console.log(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }
  return (
    <>
      <Link to='/admin/productlist' style={{ textDecoration: 'none' }}>
        <Button variant='outlined'>Go back</Button>
      </Link>
      <Container>
        <FormContainer>
          <Typography variant='h3'>Edit product</Typography>
          {loadingUpdate && <Loader />}
          {errorUpdate && (
            <Typography sx={{ color: 'lightcoral' }}>{errorUpdate}</Typography>
          )}
          {loading ? (
            <Loader />
          ) : error ? (
            <Typography>{error}</Typography>
          ) : (
            <form onSubmit={submitHandler}>
              <Box sx={{ margin: 3 }}>
                <TextField
                  value={name}
                  size='small'
                  label='name'
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box sx={{ margin: 3 }}>
                <TextField
                  value={price}
                  size='small'
                  label='Price'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Box>
              <Box sx={{ margin: 3 }}>
                <TextField
                  value={image}
                  size='small'
                  label='Image'
                  onChange={(e) => setImage(e.target.value)}
                />
                <Button component='label'>
                  <input type='file' hidden onChange={uploadFileHandler} />
                  Browse
                </Button>
              </Box>
              {uploading && <Loader />}
              <Box sx={{ margin: 3 }}>
                <TextField
                  value={brand}
                  size='small'
                  label='Brand'
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Box>
              <Box sx={{ margin: 3 }}>
                <TextField
                  value={description}
                  size='small'
                  label='Description'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
              <Box sx={{ margin: 3 }}>
                <TextField
                  value={countInStock}
                  size='small'
                  label='CountInStock'
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </Box>
              <Box sx={{ margin: 3 }}>
                <TextField
                  value={category}
                  size='small'
                  label='Category'
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Box>
              <Box sx={{ margin: 3 }}>
                <Button type='submit' variant='outlined'>
                  Update
                </Button>
              </Box>
            </form>
          )}
        </FormContainer>
      </Container>
    </>
  )
}

export default ProductEditScreen
