import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Badge,
  Button,
  Box,
  Menu,
  MenuItem,
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useDispatch, useSelector } from 'react-redux'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'
const Navbar = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchor, setAnchor] = React.useState(null)
  const open = Boolean(anchorEl)
  const openDashboard = Boolean(anchor)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClickDashboard = (event) => {
    setAnchor(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleCloseDashboard = () => {
    setAnchor(null)
  }
  const handleLogout = () => {
    dispatch(logout())
  }
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  return (
    <AppBar>
      <Toolbar sx={{ dipslay: 'flex', justifyContent: 'space-around' }}>
        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
          <Typography>QT</Typography>
        </Link>
        <SearchBox />
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <Link to='/cart' style={{ textDecoration: 'none', color: 'white' }}>
            <IconButton>
              <Badge
                badgeContent={userInfo ? cartItems.length : '0'}
                sx={{ color: 'white' }}
              >
                <ShoppingBagIcon sx={{ color: 'white' }} />
              </Badge>
            </IconButton>
          </Link>
          {userInfo ? (
            <div>
              <Button
                size='small'
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant='outlined'
                sx={{ color: 'white', textTransform: 'none' }}
                endIcon={<ArrowDropDownIcon />}
              >
                {userInfo.name}
              </Button>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    to='/profile'
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    <Button>Profile</Button>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Button onClick={handleLogout}>Logout</Button>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to='/login' style={{ textDecoration: 'none' }}>
              <Button
                size='small'
                sx={{ color: 'white', textTransform: 'none' }}
                variant='outlined'
                endIcon={<AccountCircleIcon />}
              >
                Login
              </Button>
            </Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <div>
              <Button
                size='small'
                onClick={handleClickDashboard}
                sx={{ color: 'white', textTransform: 'none' }}
                endIcon={<ArrowDropDownIcon />}
              >
                Dashboard
              </Button>
              <Menu
                anchorEl={anchor}
                open={openDashboard}
                onClose={handleCloseDashboard}
              >
                <MenuItem onClick={handleCloseDashboard}>
                  <Link style={{ textDecoration: 'none' }} to='/admin/userlist'>
                    <Button>Users</Button>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseDashboard}>
                  <Link
                    style={{ textDecoration: 'none' }}
                    to='/admin/productlist'
                  >
                    <Button>Products</Button>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseDashboard}>
                  <Link
                    style={{ textDecoration: 'none' }}
                    to='/admin/orderlist'
                  >
                    <Button>Orders</Button>
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
