import React from 'react'
import { useEffect } from 'react'
import { findImageBanner } from '../services/imageService'
import { useDispatch, useSelector } from 'react-redux'
import Slide from './Slide'

function Banner() {
  const imageBanner = useSelector(state => state.image.imageBanner)
  const dispatch =useDispatch()
  
  useEffect(() => {
    if (imageBanner.length === 0) {
      dispatch(findImageBanner())
    }
  })

  return (
    <>
      <Slide images={imageBanner} styleImage={{width:"100%",height:"400px"}}></Slide>
    </>
  )
}

export default Banner;
