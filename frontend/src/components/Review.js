import { Typography } from '@mui/material'
import { StarOutlined } from '@mui/icons-material'
import React from 'react'

const Review = ({ rating }) => {
  return (
    <Typography>
      {rating.map((rate, index) => (
        <StarOutlined key={index} />
      ))}
    </Typography>
  )
}

export default Review
