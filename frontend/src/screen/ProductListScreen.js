import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AddCircle, Delete } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
import {
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import {
  deleteProduct,
  listProducts,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
const ProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo.isAdmin) {
      navigate('/login')
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  const handleEdit = (id) => {
    navigate(`/admin/product/${id}/edit`)
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Typography variant='h3'>PRODUCT LIST</Typography>
        <Button
          sx={{
            backgroundColor: 'lightgreen',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            '&:hover': {
              boder: 'none',
              backgroundColor: 'white',
              color: 'lightgreen',
              outline: 'none',
            },
          }}
          endIcon={<AddCircle />}
          variant='outlined'
          onClick={createProductHandler}
        >
          Create
        </Button>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && (
        <Typography sx={{ color: 'lightcoral' }}>{errorDelete}</Typography>
      )}
      {loadingCreate && <Loader />}
      {errorCreate && (
        <Typography sx={{ color: 'lightcoral' }}>{errorCreate}</Typography>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Typography sx={{ color: 'lightcoral' }}> {error} </Typography>
      ) : (
        <Table sx={{ padding: 3 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>PRICE</TableCell>
              <TableCell>CATEGORY</TableCell>
              <TableCell>BRAND</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product._id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(product._id)}>
                    <EditIcon sx={{ color: 'lightblue' }} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product._id)}>
                    <Delete sx={{ color: 'lightcoral' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  )
}

export default ProductListScreen
