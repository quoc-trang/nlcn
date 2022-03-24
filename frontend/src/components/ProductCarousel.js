import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { Box, Button, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listTopProducts } from '../actions/productActions'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import MobileStepper from '@mui/material/MobileStepper'
import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme) => {
  return {
    imageCarousel: {
      display: 'block',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        height: 200,
      },
      height: 500,
      position: 'sticky',
      top: '0',
      right: '0',
      left: '0',
      bottom: '0',
      margin: 'auto',
    },
  }
})
const ProductCarousel = () => {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()
  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = products.length
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])
  return loading ? (
    <Loader />
  ) : error ? (
    <Typography>{error}</Typography>
  ) : (
    <div>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {products.map((step, index) => (
          <div key={step._id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Link to={`/product/${step._id}`}>
                <Box
                  component='img'
                  className={classes.imageCarousel}
                  src={step.image}
                  alt={step.name}
                />
              </Link>
            ) : null}
            <Typography align='center'>{step.name}</Typography>
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position='static'
        activeStep={activeStep}
        nextButton={
          <Button
            size='small'
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  )
}

export default ProductCarousel
