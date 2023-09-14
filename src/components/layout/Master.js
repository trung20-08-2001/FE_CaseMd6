import React from 'react'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import Navbar2 from '../Navbar2'

export default function Master() {
  return (
    <>
      <Navbar2></Navbar2>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}
