import { TextField, Button, Box } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  let navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Box
      sx={(theme) => ({
        border: '1px solid white',
      })}
    >
      <form onSubmit={submitHandler}>
        <TextField
          sx={{ backgroundColor: 'white' }}
          label='Search product..'
          size='small'
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button
          sx={(theme) => ({
            color: 'white',
            [theme.breakpoints.down('sm')]: {
              display: 'none',
            },
          })}
          type='submit'
          variant='outlined'
        >
          Search
        </Button>
      </form>
    </Box>
  )
}

export default SearchBox
