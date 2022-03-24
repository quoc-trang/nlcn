import React, { useState } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <div>
        {[...Array(pages).keys()].map((x) => (
          <Button
            sx={{
              marginLeft: 4,
              border: '1px solid #795548',
            }}
            key={x + 1}
          >
            <Link
              key={x + 1}
              to={
                keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`
              }
              style={{
                textDecoration: 'none',
                color: '#795548',
                width: '100%',
                height: '100%',
              }}
            >
              {x + 1}
            </Link>
          </Button>
        ))}
      </div>
    )
  )
}

export default Paginate
