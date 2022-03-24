import React from 'react'
import { Stepper, Step, StepLabel, Box } from '@mui/material'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  let stepActive = step4 ? 3 : step3 ? 2 : step2 ? 1 : step1 ? 0 : 0

  return (
    <Box>
      <Stepper activeStep={stepActive}>
        <Step>
          {step1 ? (
            <StepLabel>Login</StepLabel>
          ) : (
            <Link to='/login' style={{ textDecoration: 'none' }}>
              <StepLabel>Login</StepLabel>
            </Link>
          )}
        </Step>
        <Step>
          {step2 ? (
            <StepLabel>Shipping</StepLabel>
          ) : (
            <Link to='/shipping' style={{ textDecoration: 'none' }}>
              <StepLabel>Shipping</StepLabel>
            </Link>
          )}
        </Step>
        <Step>
          {step3 ? (
            <StepLabel>Payment</StepLabel>
          ) : (
            <Link to='/payment' style={{ textDecoration: 'none' }}>
              <StepLabel>Payment</StepLabel>
            </Link>
          )}
        </Step>
        <Step>
          {step4 ? (
            <StepLabel>Place order</StepLabel>
          ) : (
            <Link to='/placeorder' style={{ textDecoration: 'none' }}>
              <StepLabel>Place order</StepLabel>
            </Link>
          )}
        </Step>
      </Stepper>
    </Box>
  )
}

export default CheckoutSteps
