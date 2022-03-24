import {
  TextField,
  Typography,
  Button,
  Checkbox,
  Box,
  Container,
  FormControlLabel,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
const UserEditScreen = () => {
  const params = useParams()
  const userId = params.id

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isAdmin, setIsAdmin] = useState('')

  const dispatch = useDispatch()
  const history = useNavigate()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, user, userId, history, successUpdate])
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }
  return (
    <Container>
      <Link to='/admin/userList' style={{ textDecoration: 'none' }}>
        <Button variant='outlined'>Go back</Button>
      </Link>
      <FormContainer>
        <Typography variant='h3'>Edit user</Typography>
        {loadingUpdate && <Loader />}
        {errorUpdate && (
          <Typography variant='h4' sx={{ color: 'lightcoral' }}>
            {errorUpdate}
          </Typography>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Typography>{error}</Typography>
        ) : (
          <form onSubmit={submitHandler}>
            <Box>
              <TextField
                value={name}
                size='small'
                label='name'
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box sx={{ marginTop: 3, marginBottom: 3 }}>
              <TextField
                value={email}
                size='small'
                label='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box>
              <FormControlLabel
                label='Admin'
                control={<Checkbox />}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Box>
            <Box>
              <Button type='submit' variant='outlined'>
                Update
              </Button>
            </Box>
          </form>
        )}
      </FormContainer>
    </Container>
  )
}

export default UserEditScreen
