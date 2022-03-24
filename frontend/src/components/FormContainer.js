import React from 'react'
import { Grid, Container } from '@mui/material'
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Grid container>
        <Grid item lg={12} md={6}>
          {children}
        </Grid>
      </Grid>
    </Container>
  )
}

export default FormContainer
