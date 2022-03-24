import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { brown } from '@mui/material/colors'
import HomeScreen from './screen/HomeScreen'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProductScreen from './screen/ProductScreen'
import CartScreen from './screen/CartScreen'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'
import ProfileScreen from './screen/ProfileScreen'
import ShippingScreen from './screen/ShippingScreen'
import PaymentScreen from './screen/PaymentScreen'
import PlaceOrderScreen from './screen/PlaceOrderScreen'
import OrderScreen from './screen/OrderScreen'
import UserListScreen from './screen/UserListScreen'
import UserEditScreen from './screen/UserEditScreen'
import ProductListScreen from './screen/ProductListScreen'
import ProductEditScreen from './screen/ProductEditScreen'
import OrderListScreen from './screen/OrderListScreen'
import { IconButton } from '@mui/material'
import { ArrowUpward } from '@mui/icons-material'
const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat'].join(','),
  },
  palette: {
    primary: brown,
  },
})

const App = () => {
  const [visible, setVisible] = useState(false)
  const [bottom, setBottom] = useState(false)
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  window.onscroll = function () {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      setBottom(true)
    }
  }
  window.addEventListener('scroll', toggleVisible)
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Navbar />
        <div style={{ height: '10vh' }}></div>
        <Routes>
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route
            exact
            path='/login/shipping'
            element={<Navigate to='/shipping' />}
          />
          <Route path='/shipping' element={<ShippingScreen />} />
          <Route path='/order/:id' element={<OrderScreen />} />
          <Route path='/payment' element={<PaymentScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen />} />

          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/product/:id' element={<ProductScreen />} />
          <Route path='/cart/:id' element={<CartScreen />} />
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/admin/userlist' element={<UserListScreen />} />
          <Route path='/admin/productlist' element={<ProductListScreen />} />
          <Route path='/admin/orderlist' element={<OrderListScreen />} />
          <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
          <Route
            path='/admin/product/:id/edit'
            element={<ProductEditScreen />}
          />
          <Route path='/search/:keyword' exact element={<HomeScreen />} />
          <Route path='/page/:pageNumber' exact element={<HomeScreen />} />
          <Route
            path='/search/:keyword/page/:pageNumber'
            exact
            element={<HomeScreen />}
          />
          <Route path='/' exact element={<HomeScreen />} />
        </Routes>
        {visible && (
          <IconButton
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 10,
              fontSize: '20px',
              border: '1px solid #795548',
            }}
          >
            <ArrowUpward />
          </IconButton>
        )}
        {bottom && <Footer />}
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
