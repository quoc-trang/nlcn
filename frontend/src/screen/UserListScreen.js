import React, { useEffect } from 'react'
import { listUsers } from '../actions/userActions'
import { useSelector, useDispatch } from 'react-redux'
import { Delete } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
import {
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
import { deleteUser } from '../actions/userActions'
const UserListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userList = useSelector((state) => state.userList)
  const { loading, users, error } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo, successDelete])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }

  const handleEdit = (id) => {
    navigate(`/admin/user/${id}/edit`)
  }

  return (
    <Container>
      <Typography variant='h2' align='center'>
        User list
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
              <TableCell>NAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>ADMIN</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <a href={`mailto: ${user.email}`}>{user.email}</a>
                </TableCell>
                <TableCell>{user.isAdmin ? 'yes' : 'no'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(user._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user._id)}>
                    <Delete />
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

export default UserListScreen
