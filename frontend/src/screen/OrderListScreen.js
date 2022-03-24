import React, { useEffect } from 'react'
import { listOrders } from '../actions/orderActions'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
const OrderListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orderList = useSelector((state) => state.orderList)
  const { loading, orders, error } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])

  const detailOrder = (id) => {
    navigate(`/order/${id}`)
  }

  return (
    <Container>
      <Typography variant='h2' align='center'>
        Orders
      </Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <Typography sx={{ color: 'lightcoral' }}> {error} </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>USER</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>TOTAL PRICE</TableCell>
              <TableCell>PAID</TableCell>
              <TableCell>DELIVERED</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.user && order.user.name}</TableCell>
                <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <Typography sx={{ color: 'lightcoral' }}>
                      not paid
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <Typography sx={{ color: 'lightcoral' }}>
                      not delivered
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    onClick={() => detailOrder(order._id)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  )
}

export default OrderListScreen
