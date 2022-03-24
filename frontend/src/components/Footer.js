import { Typography, IconButton } from '@mui/material'
import React from 'react'
import { Facebook, GitHub, Instagram } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme) => {
  return {
    icon: {},
  }
})
const Footer = () => {
  const classes = useStyles()
  return (
    <div
      style={{
        bottom: 0,
        position: 'fixed',
        width: '100%',
        display: 'flex',
      }}
    >
      <IconButton className={classes.icon}>
        <Facebook />
      </IconButton>
      <IconButton className={classes.icon}>
        <Instagram />
      </IconButton>
      <IconButton className={classes.icon}>
        <GitHub />
      </IconButton>
    </div>
  )
}

export default Footer
