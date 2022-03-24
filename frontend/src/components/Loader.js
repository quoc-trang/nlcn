import { Box, LinearProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <Box sx={{ marginTop: '5vh' }}>
      <LinearProgress />
    </Box>
  )
}

export default Loader
